# Supabase Auth Setup Guide

This guide will help you set up Supabase authentication for AnalytIQ Campus.

## 🚀 Quick Setup

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and create an account
2. Click "New Project"
3. Choose your organization and fill in project details:
   - **Name**: `analytiq-campus` (or your preferred name)
   - **Database Password**: Generate a secure password
   - **Region**: Choose closest to your users
4. Click "Create new project"

### 2. Get Your Project Keys

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (starts with `https://`)
   - **Anon key** (public key, safe for client-side)
   - **Service role key** (secret key, server-side only)

### 3. Configure Environment Variables

Update your `.env.local` file with your Supabase credentials:

```bash
# Replace these with your actual Supabase project values
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Optional: Google OAuth (see below)
# NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
# GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### 4. Configure Authentication

1. In Supabase dashboard, go to **Authentication** → **Settings**
2. Set **Site URL** to: `http://localhost:3000` (for development)
3. Add **Redirect URLs**:
   - `http://localhost:3000/auth/callback`
   - `https://your-domain.com/auth/callback` (for production)

### 5. Enable Email Templates (Optional)

1. Go to **Authentication** → **Email Templates**
2. Customize the "Magic Link" template if desired
3. Make sure "Enable email confirmations" is turned on

## 🔧 Google OAuth Setup (Optional)

To enable Google sign-in:

### 1. Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Google+ API
4. Go to **APIs & Services** → **Credentials**
5. Click **Create Credentials** → **OAuth 2.0 Client ID**
6. Configure consent screen if prompted
7. Set Application type to **Web application**
8. Add authorized redirect URIs:
   - `https://your-project-id.supabase.co/auth/v1/callback`

### 2. Configure in Supabase

1. In Supabase dashboard, go to **Authentication** → **Providers**
2. Enable **Google**
3. Enter your Google Client ID and Client Secret
4. Save configuration

### 3. Add to Environment Variables

```bash
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

## 🛡️ Security Configuration

### Production Settings

When deploying to production:

1. **Update Site URL** in Supabase to your production domain
2. **Add production redirect URLs**
3. **Never expose service role key** on client-side
4. **Enable RLS** (Row Level Security) for data tables

### Environment Variables for Vercel

When deploying to Vercel, add these environment variables:

1. Go to Vercel dashboard → Your project → Settings → Environment Variables
2. Add these variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_GOOGLE_CLIENT_ID` (if using Google OAuth)
   - `GOOGLE_CLIENT_SECRET` (if using Google OAuth)

## 📝 Features Included

### ✅ Magic Link Login
- Email-based authentication
- No passwords required
- Secure and user-friendly

### ✅ Google OAuth (Optional)
- One-click Google sign-in
- Automatically configured when credentials are present

### ✅ Session Management
- Persistent login across browser sessions
- Automatic token refresh
- Secure cookie handling

### ✅ Route Protection
- Middleware-based protection
- Server-side authentication checks
- Client-side auth state management

### ✅ Protected Pages
- `/account` - User profile and settings
- `/draft` - Fantasy team drafting (requires auth)
- `/leaderboard` - View rankings (requires auth)

### ✅ Auth Components
- `AuthProvider` - Global auth state management
- `ProtectedRoute` - Client-side route protection
- `LogoutButton` - Secure sign-out functionality

## 🔗 API Routes

### Authentication Endpoints
- `GET /auth/callback` - Handles OAuth callbacks and magic links
- Uses `withAuth()` wrapper for protected API routes
- Uses `withOptionalAuth()` for routes that work with/without auth

## 🧪 Testing the Setup

1. **Start development server**: `npm run dev`
2. **Visit**: `http://localhost:3000/login`
3. **Test magic link**: Enter your email and check inbox
4. **Test Google OAuth**: Click "Continue with Google" (if configured)
5. **Verify protection**: Try accessing `/account` without logging in
6. **Test logout**: Use logout button or visit `/logout`

## 🔍 Troubleshooting

### Common Issues

**"Invalid redirect URL"**
- Check redirect URLs in Supabase dashboard
- Ensure URLs match exactly (including protocol)

**"Missing credentials"**
- Verify environment variables are set correctly
- Check for typos in variable names
- Restart development server after adding variables

**"User not found"**
- User might need to confirm email
- Check spam folder for magic link
- Verify email templates are enabled

**Google OAuth not working**
- Verify Google credentials in Supabase
- Check Google Cloud Console OAuth settings
- Ensure redirect URI matches Supabase callback URL

### Environment Variable Check

```bash
# Verify your environment variables are loaded
echo $NEXT_PUBLIC_SUPABASE_URL
echo $NEXT_PUBLIC_SUPABASE_ANON_KEY
# Service role key should NOT be echoed (security)
```

## 📚 Additional Resources

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Next.js with Supabase](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs)
- [Supabase Auth Helpers](https://supabase.com/docs/guides/auth/auth-helpers)

---

**🔒 Security Note**: Never commit your `.env.local` file or expose service role keys. The anon key is safe for client-side use, but service role keys should only be used server-side.