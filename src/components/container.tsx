import React from 'react';
import { SafeAreaView, ScrollView, ViewProps } from 'react-native';

import { cn } from '@lib/utils';

export const Container = React.forwardRef<SafeAreaView, ViewProps>(
  ({ className, ...props }, ref) => {
    return (
      <ScrollView>
        <SafeAreaView className={cn('m-6 flex flex-1', className)} {...props} ref={ref} />
      </ScrollView>
    );
  }
);
