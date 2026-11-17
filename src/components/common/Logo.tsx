import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/utils/colors';
import { Typography } from '@/utils/typography';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  showTagline?: boolean;
}

export const Logo = ({ size = 'medium', showTagline = true }: LogoProps) => {
  const getSize = () => {
    if (size === 'small') return 24;
    if (size === 'large') return 48;
    return 32;
  };

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    nameContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    name: {
      fontSize: getSize(),
      fontWeight: '700',
      color: Colors.white,
      marginLeft: 8,
    },
    icon: {
      width: getSize() * 1.2,
      height: getSize() * 1.2,
      backgroundColor: Colors.primary,
      borderRadius: getSize() * 0.6,
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconText: {
      fontSize: getSize() * 0.6,
      fontWeight: '700',
      color: Colors.white,
    },
    tagline: {
      ...Typography.caption,
      color: Colors.accent,
      marginTop: 8,
      fontStyle: 'italic',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <View style={styles.icon}>
          <Text style={styles.iconText}>🎬</Text>
        </View>
        <Text style={styles.name}>CUT BAT AI</Text>
      </View>
      {showTagline && <Text style={styles.tagline}>Your Vision. Our Intelligence.</Text>}
    </View>
  );
};
