import { ActivityIndicator, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function Loading() {
  return (
    <ActivityIndicator
      size={'large'}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    />
  );
}
