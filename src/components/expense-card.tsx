import React from 'react';

import { Expense } from '@lib/api/expenses';

import { Card, CardDescription, CardHeader, CardTitle } from '@components/ui/card';
import { Link } from 'expo-router';

function ExpenseCard({ expense }: { expense: Expense }) {
  return (
    <Link href={`/expense/${expense.id}`} className="flex flex-1 w-full">
      <Card className='flex-1 w-full'>
        <CardHeader>
          <CardTitle>{expense.amount}</CardTitle>
          <CardDescription>{expense.notes}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}

export default ExpenseCard;
