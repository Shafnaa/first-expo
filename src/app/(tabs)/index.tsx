import React, { useEffect } from 'react';
import { Stack } from 'expo-router';

import { useExpenses } from '@lib/api/expenses';
import { useTotal } from '@lib/api/total';

import { Text } from '@components/ui/text';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card';

import { Container } from '@components/container';

import Spinner from '@components/spinner';
import ExpenseCard from '@components/expense-card';

export default function Home() {
  const total = useTotal();
  const expenses = useExpenses();

  

  return (
    <>
      <Stack.Screen options={{ title: 'Expense Tracker' }} />
      <Container className='flex flex-col gap-8'>
        <Card className="w-full">
          {total.isLoading && <Spinner />}
          {total.isError && <Text>Error: {total.error.message}</Text>}
          {total.data && (
            <>
              <CardHeader>
                <CardTitle className="flex">
                  Total Expense: {total.data.total_amount}{' '}
                  <Text className="mb-auto ml-auto">{total.data.total}</Text>
                </CardTitle>
                <CardDescription>Average Expense: {total.data.average_amount}</CardDescription>
              </CardHeader>
              <CardContent>
                <Text>Highest expense: {total.data.max_amount}</Text>
                <Text>Lowest expense: {total.data.min_amount}</Text>
              </CardContent>
            </>
          )}
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Expenses</CardTitle>
            <CardDescription>List of all expenses</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {expenses.isLoading && <Spinner />}
            {expenses.isError && <Text>Error: {expenses.error.message}</Text>}
            {expenses.data &&
              expenses.data.map((expense) => <ExpenseCard key={expense.id} expense={expense} />)}
            {expenses.data && expenses.data.length === 0 && <Text>No expenses found</Text>}
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

const styles = {
  container: 'flex p-6',
};
