from fastapi import FastAPI, Request

from sqlalchemy import create_engine, Column, Integer, Text, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from datetime import datetime
from fastapi.middleware.cors import CORSMiddleware

# SQLite database
SQLALCHEMY_DATABASE_URL = "sqlite:///./backend/sqlite.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

# Import for CORS support - to be used after app is created

Base = declarative_base()


class History(Base):
    __tablename__ = "history"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    amount = Column(Integer, nullable=False)
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.now())
    updated_at = Column(DateTime, default=datetime.now(), onupdate=datetime.now())


SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.create_all(bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


app = FastAPI(docs_url="/docs", openapi_url="/openapi.json", redoc_url=None)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/total")
async def get_total_expenses():
    db = next(get_db())
    total = db.query(History).count()

    if total == 0:
        return {
            "data": {
                "total": 0,
                "total_amount": 0,
                "average_amount": 0,
                "max_amount": 0,
                "min_amount": 0,
            },
            "message": "No expenses found",
        }

    # Calculate the total amount of expenses
    summary = db.query(History).all()

    # Calculate the total amount, average amount, max amount, and min amount
    total_amount = sum([item.amount for item in summary])
    average_amount = total_amount / total
    max_amount = max([item.amount for item in summary])
    min_amount = min([item.amount for item in summary])

    # Return the summary
    return {
        "data": {
            "total": total,
            "total_amount": total_amount,
            "average_amount": average_amount,
            "max_amount": max_amount,
            "min_amount": min_amount,
        }
    }


@app.get("/expenses")
async def read_expenses():
    db = next(get_db())
    expenses = db.query(History).all()
    return {"data": expenses}


@app.post("/expenses")
async def create_expense(request: Request):
    request = await request.json()

    if not request.get("amount"):
        return {"error": "Amount are required"}

    db = next(get_db())
    expense = History(amount=request.get("amount"), notes=request.get("notes"))
    db.add(expense)
    db.commit()
    db.refresh(expense)
    return {"data": expense}


@app.put("/expenses/{expense_id}")
async def update_expense(expense_id: int, request: Request):
    db = next(get_db())
    expense = db.query(History).filter(History.id == expense_id).first()

    if not expense:
        return {"error": "Expense not found"}

    request = await request.json()

    if request.get("amount"):
        expense.amount = request.get("amount")

    if request.get("notes"):
        expense.notes = request.get("notes")

    expense.updated_at = datetime.now()

    db.commit()
    db.refresh(expense)
    return {"data": expense}


@app.delete("/expenses/{expense_id}")
async def delete_expense(expense_id: int):
    db = next(get_db())
    expense = db.query(History).filter(History.id == expense_id).first()

    if not expense:
        return {"error": "Expense not found"}

    db.delete(expense)
    db.commit()
    return {"message": "Expense deleted successfully"}


@app.get("/expenses/{expense_id}")
async def read_expense(expense_id: int):
    db = next(get_db())
    expense = db.query(History).filter(History.id == expense_id).first()

    if not expense:
        return {"error": "Expense not found"}

    return {"data": expense}
