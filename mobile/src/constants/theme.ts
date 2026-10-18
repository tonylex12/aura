import { Platform } from 'react-native';

export const colors = {
  cream: '#FBF7EF', paper: '#FFFDF8', ink: '#292820', muted: '#7C776E',
  coral: '#ED795F', coralSoft: '#F7D7CD', yellow: '#F2D565', lavender: '#DDD8F4',
  mint: '#DDEEE3', blue: '#DDE8F6', line: '#E9E2D7', success: '#4E8B66', danger: '#B95242',
};

export const type = { rounded: Platform.select({ ios: 'ui-rounded', default: 'sans-serif' }) };
