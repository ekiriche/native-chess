import { Pressable, PressableProps, StyleSheet, Text } from "react-native";

type ButtonProps = PressableProps & {
  text: React.ReactNode;
};

export const Button = ({ text, style, ...rest }: ButtonProps) => {
  return (
    <Pressable style={styles.container} {...rest}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "lightblue",
    textTransform: "uppercase",
  },
  text: {
    color: "white",
    fontSize: 24,
  },
});
