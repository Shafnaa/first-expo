import FontAwesome from '@expo/vector-icons/FontAwesome';

export const TabBarIcon = (props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) => {
  return <FontAwesome size={28} className={styles.tabBarIcon} {...props} />;
};

export const styles = {
  tabBarIcon: '-mb-2',
};
