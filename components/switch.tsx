import React, { useEffect, useRef } from "react";
import { Animated, Pressable, StyleSheet } from "react-native";

const SWITCH_WIDTH = 40;
const SWITCH_HEIGHT = 22;
const DOT_SIZE = 15;
const DOT_MARGIN = 3.5;

type Switcher1Props = {
  value: boolean;
  onValueChange: (value: boolean) => void;
};

const Switcher1 = ({ value, onValueChange }: Switcher1Props) => {
  const anim = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [value]);

  const toggleSwitch = () => {
    onValueChange(!value);
  };

  const translateX = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [DOT_MARGIN - 2, SWITCH_WIDTH - DOT_SIZE - DOT_MARGIN - 4],
  });

  const backgroundColor = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#3f3f3f", "#6366F1"],
  });

  return (
    <Pressable onPress={toggleSwitch} style={styles.label}>
      <Animated.View style={[styles.switch, { backgroundColor }]}>
        <Animated.View style={[styles.dot, { transform: [{ translateX }] }]} />
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  label: {
    flexDirection: "row",
    alignItems: "center",
  },
  switch: {
    width: SWITCH_WIDTH,
    height: SWITCH_HEIGHT,
    borderRadius: SWITCH_HEIGHT / 2,
    justifyContent: "center",
  },
  dot: {
    position: "absolute",
    top: DOT_MARGIN,
    left: DOT_MARGIN,
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: "#fff",
    elevation: 2,
  },
});

export default Switcher1;
