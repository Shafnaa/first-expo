import { Stack } from 'expo-router';
import { View } from 'react-native';

import { Text } from '@components/ui/text';

export default function NewRecord() {
  return (
    <>
      <Stack.Screen options={{ title: 'Tab Two' }} />
      <View className='flex p-6'>
        <Text>Testing</Text>
      </View>
    </>
  );
}
