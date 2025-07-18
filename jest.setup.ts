import '@testing-library/jest-dom';

// Add TextEncoder/TextDecoder polyfills for React Router
// For Node.js environments
import { TextEncoder, TextDecoder } from 'util';

// Use type assertions to solve the type compatibility issue
global.TextEncoder = TextEncoder as typeof global.TextEncoder;
global.TextDecoder = TextDecoder as typeof global.TextDecoder;
