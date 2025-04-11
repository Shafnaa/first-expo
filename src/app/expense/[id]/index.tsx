import React from 'react';

import { router } from 'expo-router';
import { Text } from 'react-native';
import { Link, Stack, useLocalSearchParams } from 'expo-router';

import { cn } from '@lib/utils';

import { useDeleteExpense, useExpense } from '@lib/api/expenses';

import { Button, buttonVariants } from '@components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@components/ui/card';

import { Container } from '@components/container';

import Spinner from '@components/spinner';

function ExpenseDetail() {
  const { id } = useLocalSearchParams();
  const { data, isLoading, isError, error } = useExpense(id as string);
  const { mutateAsync } = useDeleteExpense();

  const handleDelete = async () => {
    try {
      await mutateAsync(id as string);

      // After successful deletion, navigate to home page
      router.replace('/');
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Expense Detail' }} />
      <Container>
        <Card>
          {isLoading && <Spinner />}
          {isError && <Text>Error: {error.message}</Text>}
          {data && (
            <>
              <CardHeader>
                <CardTitle>{data.amount}</CardTitle>
                <CardDescription>{data.notes}</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <Text>Updated at: {data.updated_at}</Text>
                <Text>Created at: {data.created_at}</Text>
              </CardContent>
              <CardFooter className="flex flex-col gap-1">
                <Link
                  href={`/update/${id}`}
                  className={cn(buttonVariants({ variant: 'outline' }), 'flex w-full flex-1')}>
                  <Text className='text-center'>Edit</Text>
                </Link>
                <Button variant="destructive" className="mt-2 w-full" onPress={handleDelete}>
                  <Text>Delete</Text>
                </Button>
              </CardFooter>
            </>
          )}
        </Card>
      </Container>
    </>
  );
}

export default ExpenseDetail;
