import { config } from '@vue/test-utils';
import TDesign from 'tdesign-vue-next';

// Register the TDesign plugin globally for all test cases
config.global.plugins = [TDesign];
