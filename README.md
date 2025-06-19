# PeoplePulse - Employee Dashboard

## Overview

PeoplePulse is a comprehensive HR management system built with React, Firebase authentication, and Tailwind CSS. This modern web application provides a complete suite of tools for managing employees, projects, attendance, analytics, and more.

![PeoplePulse Dashboard](https://example.com/dashboard-preview.png)

## Features

### Authentication
- **User Registration**: Sign up with email/password or Google account
- **Login**: Secure login with Firebase authentication
- **Password Reset**: Ability to reset forgotten passwords
- **Profile Management**: Update personal details, profile photos, and credentials

### Dashboard Modules
- **Overview**: Key metrics and activity summary
- **Employees**: Employee directory with details and contact information
- **Clients**: Client management with status tracking
- **Projects**: Project tracking with progress visualization
- **Attendance**: Calendar-based attendance tracking
- **Holiday**: Company holiday management
- **Accounts**: Financial tracking and reporting
- **Jobs**: Job posting management and applicant tracking
- **Consultancy**: Consultancy client management
- **Analytics**: Business intelligence and data visualization
- **Calendar**: Integrated calendar for scheduling
- **Reports**: Customizable reports for various HR metrics
- **Messages**: Internal communication system

### User Profile
- View and update personal information
- Change password and email securely
- Upload profile photo with image type validation
- Customizable user information including position, department, location, and bio

## Technical Stack

- **Frontend**: React.js with functional components and hooks
- **Authentication**: Firebase Authentication
- **Styling**: Tailwind CSS for responsive design
- **State Management**: React Context and local component state
- **Routing**: React Router for navigation
- **Charts and Visualization**: Recharts and Chart.js
- **Icons**: Lucide React
- **Forms**: Custom form implementation with validation

## Project Structure
```bash
employee-dashboard/
├── src/
│   ├── assets/      # Static assets
│   ├── components/  # React components
│   │   ├── layout/  # Layout components (Header,Sidebar)
│   │   ├── modals/  # Modal components
│   │   └── pages/   # Page components
│   ├── data/        # Sample data for demo
│   ├── services/    # Service modules (auth, etc.)
│   ├── ui/          # Reusable UI components
│   ├── App.jsx      # Main application component
│   ├── App.css      # Global styles
│   ├── index.css    # Entry CSS file
│   └── main.jsx     # Application entry point
├── public/          # Public assets
├── .env             # Environment variables
├── package.json     # Dependencies and scripts
└── README.md        # Project documentation

```

## Setup and Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ariktheone/employee-dashboard.git
   cd employee-dashboard
   ```
2. **Install dependencies**
    ```bash
    npm install
    ```
3. **Environment variables** Create a `.env` file in the root directory with the following Firebase configuration:
    ```bash
    VITE_FIREBASE_API_KEY=your-api-key
    VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
    VITE_FIREBASE_PROJECT_ID=your-project-id
    VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
    VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
    VITE_FIREBASE_APP_ID=your-app-id
    VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id
    ```
4. **Start the development server**
    ```bash
    npm run dev
    ```

5. **Build for production**
    ```bash
    npm run build
    ```

## Authentication Methods

### Email/Password Authentication
- Standard email and password registration
- Password must be at least 6 characters
- Validation for email format

### Google Authentication
- Single-click sign-in with Google account
- Profile information imported from Google account

## User Roles

- **Admin**: Full access to all dashboard features
- **Employee**: Limited access to personal information and assigned projects
- **Manager**: Department-specific access and team management capabilities

## Profile Management

Users can manage their profiles through the dedicated Profile page:

- **Personal Information**: Update name, phone number, position, department, location, join date, and bio
- **Security Settings**: Update email address (requires password verification)
- **Password Management**: Change password with current password verification
- **Profile Photo**: Upload and update profile photo with support for JPEG, PNG, and GIF formats

## Future Enhancements

- **Real-time Notifications**: Implement real-time notifications for important updates
- **Advanced Permissions**: Role-based access control with custom permissions
- **Mobile App**: Native mobile application for iOS and Android
- **Integration with HR Tools**: API integration with payroll and other HR systems
- **Advanced Analytics**: Expanded analytics with predictive capabilities
- **Document Management**: Secure storage and management of employee documents

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or support, please contact:

- Email: arijitmondal200430@gmail.com


---

**PeoplePulse HR Management Suite** - Making HR management seamless and intuitive.

