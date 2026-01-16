# Features Directory

Feature-based architecture for PT Pradja Artha Sejahtera platform.

## Structure

Each feature contains:
- **components/** - Feature-specific React components
- **hooks/** - Custom hooks for feature logic
- **utils/** - Helper functions and utilities

```
features/
├── properties/     # Property management
├── agents/         # Agent management
├── auth/           # Authentication
├── dashboard/      # Admin dashboard
└── company/        # Company info
```

## Usage

```javascript
import { useProperties, calculateMonthlyPayment } from '@/features/properties';
import { useAuth, validateCredentials } from '@/features/auth';
```

See individual feature directories for detailed documentation.
