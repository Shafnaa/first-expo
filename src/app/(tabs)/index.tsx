import React, { useEffect } from 'react';
import { Stack } from 'expo-router';

import { useExpenses } from '@lib/api/expenses';

import { Text } from '@components/ui/text';
import { Card, CardDescription, CardHeader, CardTitle } from '@components/ui/card';

import { Container } from '@components/container';

export default function Home() {
  const { data, isLoading, error } = useExpenses();

  return (
    <>
      <Stack.Screen options={{ title: 'Tab One' }} />
      <Container>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>testing</CardTitle>
            <CardDescription>testing lagi</CardDescription>
          </CardHeader>
        </Card>
      </Container>
    </>
  );
}

const styles = {
  container: 'flex p-6',
};
