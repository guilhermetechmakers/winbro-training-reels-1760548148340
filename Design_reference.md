# Modern Design Best Practices

## Philosophy

Create unique, memorable experiences while maintaining consistency through modern design principles. Every project should feel distinct yet professional, innovative yet intuitive.

---

## Landing Pages & Marketing Sites

### Hero Sections
**Go beyond static backgrounds:**
- Animated gradients with subtle movement
- Particle systems or geometric shapes floating
- Interactive canvas backgrounds (Three.js, WebGL)
- Video backgrounds with proper fallbacks
- Parallax scrolling effects
- Gradient mesh animations
- Morphing blob animations

**Avoid:** Plain solid colors or static images

### Layout Patterns
**Use modern grid systems:**
- Bento grids (asymmetric card layouts)
- Masonry layouts for varied content
- Feature sections with diagonal cuts or curves
- Overlapping elements with proper z-index
- Split-screen designs with scroll-triggered reveals

**Avoid:** Traditional 3-column equal grids

### Scroll Animations
**Engage users as they scroll:**
- Fade-in and slide-up animations for sections
- Scroll-triggered parallax effects
- Progress indicators for long pages
- Sticky elements that transform on scroll
- Horizontal scroll sections for portfolios
- Text reveal animations (word by word, letter by letter)
- Number counters animating into view

**Avoid:** Static pages with no scroll interaction

### Call-to-Action Areas
**Make CTAs impossible to miss:**
- Gradient buttons with hover effects
- Floating action buttons with micro-interactions
- Animated borders or glowing effects
- Scale/lift on hover
- Interactive elements that respond to mouse position
- Pulsing indicators for primary actions

---

## Dashboard Applications

### Layout Structure
**Always use collapsible side navigation:**
- Sidebar that can collapse to icons only
- Smooth transition animations between states
- Persistent navigation state (remember user preference)
- Mobile: drawer that slides in/out
- Desktop: sidebar with expand/collapse toggle
- Icons visible even when collapsed

**Structure:**
```
/dashboard (layout wrapper with sidebar)
  /dashboard/overview
  /dashboard/analytics
  /dashboard/settings
  /dashboard/users
  /dashboard/projects
```

All dashboard pages should be nested inside the dashboard layout, not separate routes.

### Data Tables
**Modern table design:**
- Sticky headers on scroll
- Row hover states with subtle elevation
- Sortable columns with clear indicators
- Pagination with items-per-page control
- Search/filter with instant feedback
- Selection checkboxes with bulk actions
- Responsive: cards on mobile, table on desktop
- Loading skeletons, not spinners
- Empty states with illustrations or helpful text

**Use modern table libraries:**
- TanStack Table (React Table v8)
- AG Grid for complex data
- Data Grid from MUI (if using MUI)

### Charts & Visualizations
**Use the latest charting libraries:**
- Recharts (for React, simple charts)
- Chart.js v4 (versatile, well-maintained)
- Apache ECharts (advanced, interactive)
- D3.js (custom, complex visualizations)
- Tremor (for dashboards, built on Recharts)

**Chart best practices:**
- Animated transitions when data changes
- Interactive tooltips with detailed info
- Responsive sizing
- Color scheme matching design system
- Legend placement that doesn't obstruct data
- Loading states while fetching data

### Dashboard Cards
**Metric cards should stand out:**
- Gradient backgrounds or colored accents
- Trend indicators (↑ ↓ with color coding)
- Sparkline charts for historical data
- Hover effects revealing more detail
- Icon representing the metric
- Comparison to previous period

---

## Color & Visual Design

### Color Palettes
**Create depth with gradients:**
- Primary gradient (not just solid primary color)
- Subtle background gradients
- Gradient text for headings
- Gradient borders on cards
- Dark mode with elevated surfaces

**Color usage:**
- 60-30-10 rule (dominant, secondary, accent)
- Consistent semantic colors (success, warning, error)
- Accessible contrast ratios (WCAG AA minimum)

### Typography
**Create hierarchy through contrast:**
- Large, bold headings (48-72px for heroes)
- Clear size differences between levels
- Variable font weights (300, 400, 600, 700)
- Letter spacing for small caps
- Line height 1.5-1.7 for body text
- Inter, Poppins, or DM Sans for modern feel

### Shadows & Depth
**Layer UI elements:**
- Multi-layer shadows for realistic depth
- Colored shadows matching element color
- Elevated states on hover
- Neumorphism for special elements (sparingly)

---

## Interactions & Micro-animations

### Button Interactions
**Every button should react:**
- Scale slightly on hover (1.02-1.05)
- Lift with shadow on hover
- Ripple effect on click
- Loading state with spinner or progress
- Disabled state clearly visible
- Success state with checkmark animation

### Card Interactions
**Make cards feel alive:**
- Lift on hover with increased shadow
- Subtle border glow on hover
- Tilt effect following mouse (3D transform)
- Smooth transitions (200-300ms)
- Click feedback for interactive cards

### Form Interactions
**Guide users through forms:**
- Input focus states with border color change
- Floating labels that animate up
- Real-time validation with inline messages
- Success checkmarks for valid inputs
- Error states with shake animation
- Password strength indicators
- Character count for text areas

### Page Transitions
**Smooth between views:**
- Fade + slide for page changes
- Skeleton loaders during data fetch
- Optimistic UI updates
- Stagger animations for lists
- Route transition animations

---

## Mobile Responsiveness

### Mobile-First Approach
**Design for mobile, enhance for desktop:**
- Touch targets minimum 44x44px
- Generous padding and spacing
- Sticky bottom navigation on mobile
- Collapsible sections for long content
- Swipeable cards and galleries
- Pull-to-refresh where appropriate

### Responsive Patterns
**Adapt layouts intelligently:**
- Hamburger menu → full nav bar
- Card grid → stack on mobile
- Sidebar → drawer
- Multi-column → single column
- Data tables → card list
- Hide/show elements based on viewport

---

## Loading & Empty States

### Loading States
**Never leave users wondering:**
- Skeleton screens matching content layout
- Progress bars for known durations
- Animated placeholders
- Spinners only for short waits (<3s)
- Stagger loading for multiple elements
- Shimmer effects on skeletons

### Empty States
**Make empty states helpful:**
- Illustrations or icons
- Helpful copy explaining why it's empty
- Clear CTA to add first item
- Examples or suggestions
- No "no data" text alone

---

## Unique Elements to Stand Out

### Distinctive Features
**Add personality:**
- Custom cursor effects on landing pages
- Animated page numbers or section indicators
- Unusual hover effects (magnification, distortion)
- Custom scrollbars
- Glassmorphism for overlays
- Animated SVG icons
- Typewriter effects for hero text
- Confetti or celebration animations for actions

### Interactive Elements
**Engage users:**
- Drag-and-drop interfaces
- Sliders and range controls
- Toggle switches with animations
- Progress steps with animations
- Expandable/collapsible sections
- Tabs with slide indicators
- Image comparison sliders
- Interactive demos or playgrounds

---

## Consistency Rules

### Maintain Consistency
**What should stay consistent:**
- Spacing scale (4px, 8px, 16px, 24px, 32px, 48px, 64px)
- Border radius values
- Animation timing (200ms, 300ms, 500ms)
- Color system (primary, secondary, accent, neutrals)
- Typography scale
- Icon style (outline vs filled)
- Button styles across the app
- Form element styles

### What Can Vary
**Project-specific customization:**
- Color palette (different colors, same system)
- Layout creativity (grids, asymmetry)
- Illustration style
- Animation personality
- Feature-specific interactions
- Hero section design
- Card styling variations
- Background patterns or textures

---

## Technical Excellence

### Performance
- Optimize images (WebP, lazy loading)
- Code splitting for faster loads
- Debounce search inputs
- Virtualize long lists
- Minimize re-renders
- Use proper memoization

### Accessibility
- Keyboard navigation throughout
- ARIA labels where needed
- Focus indicators visible
- Screen reader friendly
- Sufficient color contrast
- Respect reduced motion preferences

---

## Key Principles

1. **Be Bold** - Don't be afraid to try unique layouts and interactions
2. **Be Consistent** - Use the same patterns for similar functions
3. **Be Responsive** - Design works beautifully on all devices
4. **Be Fast** - Animations are smooth, loading is quick
5. **Be Accessible** - Everyone can use what you build
6. **Be Modern** - Use current design trends and technologies
7. **Be Unique** - Each project should have its own personality
8. **Be Intuitive** - Users shouldn't need instructions


---

# Project-Specific Customizations

**IMPORTANT: This section contains the specific design requirements for THIS project. The guidelines above are universal best practices - these customizations below take precedence for project-specific decisions.**

## User Design Requirements

# Winbro Training Reels - Development Blueprint

Winbro Training Reels is a secure, web-based platform that revolutionizes industrial knowledge sharing through short, searchable video clips (20–30 seconds) that capture machine operation, tooling, setup, maintenance, and troubleshooting expertise. The platform serves internal Winbro teams and subscribed customers, providing customer-specific video libraries, a drag-and-drop course builder, interactive quizzes with certification, powerful search and AI-driven tagging, and robust admin controls. Designed for mobile and offline use, Winbro Training Reels accelerates onboarding, preserves tribal knowledge, and positions Winbro as a leader in operational excellence.

---

## 1. Pages (UI Screens)

### 1.1 Email Verification
- **Purpose:** Verifies newly created accounts via email token, displays verification outcome, and guides next steps.
- **Key Sections/Components:**
  - Verification Status Panel (success/failure message, next steps)
  - Resend Verification Button (with rate-limit info)
  - Continue to Dashboard CTA

### 1.2 Create / Upload Clip
- **Purpose:** Guided workflow for capturing/uploading training clips with required metadata and quality controls.
- **Key Sections/Components:**
  - Capture Guidance (checklist, in-app tips, sample templates)
  - Upload Widget (drag-and-drop, device camera, resumable upload)
  - Metadata Form (title, machine, process, tooling, step, tags, privacy)
  - Auto Transcription & AI Tag Suggestions (editable transcript, tag editor)
  - Thumbnail Selector (auto, manual)
  - Submit for Review Toggle (draft/publish)
  - Upload Progress Indicator & Validation

### 1.3 Login / Signup
- **Purpose:** Entry point for all users/admins with multiple authentication methods, including SSO and magic link.
- **Key Sections/Components:**
  - Email/Password Form (fields, validation)
  - SSO Buttons (SAML/OIDC, Google, Microsoft)
  - Magic Link Option
  - Forgot Password Link
  - Sign Up Toggle (role selection, company details)
  - Inline Error Messages

### 1.4 Password Reset
- **Purpose:** Enables users to request password reset and set a new password via secure token.
- **Key Sections/Components:**
  - Request Form (email input)
  - Reset Form (new password, confirm, strength meter)
  - Token Validation/Error Messages
  - Success State/CTA to Login

### 1.5 Order / Transaction History
- **Purpose:** Allows billing admins to view invoices, payments, subscription status, and manage payment methods.
- **Key Sections/Components:**
  - Transaction Table (date, amount, status, download invoice)
  - Subscription Summary (plan, billing date, seats)
  - Payment Methods List (saved cards, remove/default)

### 1.6 User Management
- **Purpose:** Admin interface to manage users, roles, seat assignments, and activity.
- **Key Sections/Components:**
  - User List (table, search, filters by org/role/status)
  - User Detail Panel (activity log, assigned courses, permissions)
  - Bulk Invite/Role Assignment (CSV import, templates)
  - Deactivate/Reactivate, Audit Trail

### 1.7 Content Library / Browse
- **Purpose:** Explore, search, and manage the video catalog with advanced filters and bulk actions.
- **Key Sections/Components:**
  - Filter Sidebar (machine, process, tags, customer, duration, date, access)
  - Results Grid/List (thumbnail, title, quick actions)
  - Bulk Actions Bar (select, assign, change visibility, delete, export)
  - Sort/Pagination/Infinite Scroll

### 1.8 Settings / Preferences (Organization)
- **Purpose:** Organization-level config for content allocation, seats, SSO, workflows, branding, and billing.
- **Key Sections/Components:**
  - Organization Info (name, contacts)
  - Seat & License Management
  - SSO & Security Settings
  - Content Workflow (approval stages, reviewers)
  - Branding (logo, color, player skin)
  - Subscription & Billing Overview

### 1.9 Admin Dashboard
- **Purpose:** Platform admin console for moderation, user/content management, analytics, and health monitoring.
- **Key Sections/Components:**
  - Moderation Queue (flagged/pending)
  - User Management Panel
  - Customer Libraries & Content Allocation
  - Analytics Overview (usage, top clips)
  - System Health (jobs, processing)

### 1.10 User Profile
- **Purpose:** Account management for users (details, password, notification prefs, devices, content overview).
- **Key Sections/Components:**
  - Profile Info (name, role, contact)
  - Account Security (password, 2FA, SSO info)
  - Notifications (prefs, digest schedule)
  - Devices & Sessions
  - Assigned Courses/Progress Snapshot
  - Billing Link (if permitted)

### 1.11 Analytics & Reports
- **Purpose:** Detailed reporting for managers/admins on usage, course performance, and exports.
- **Key Sections/Components:**
  - Dashboards (user activity, completions)
  - Clip Performance Metrics
  - Course Metrics (enrollment, pass rate)
  - Export Controls (CSV/PDF, scheduled)
  - Filters (date, customer, team)

### 1.12 Landing Page
- **Purpose:** Public marketing page with value proposition, features, testimonials, pricing, and CTAs.
- **Key Sections/Components:**
  - Hero Section (headline, CTA, hero video)
  - Feature Highlights
  - Customer Logos/Testimonials
  - Pricing Summary
  - How It Works (visual steps)
  - Footer (links)

### 1.13 Cookie Policy
- **Purpose:** Inform users about cookies and provide consent controls.
- **Key Sections/Components:**
  - Cookie Categories (essential, analytics, marketing)
  - Consent Toggles
  - Save Preferences Button

### 1.14 Course Builder
- **Purpose:** Drag-and-drop tool for assembling courses from clips, adding quizzes, and scheduling.
- **Key Sections/Components:**
  - Course Canvas (drag/re-order videos, modules)
  - Quiz Editor (types, time limits, pass score)
  - Course Settings (visibility, enrollment, expiry)
  - Preview Mode
  - Publish & Assign Controls
  - Analytics Preview

### 1.15 Course Player & Quiz
- **Purpose:** Learner UI for sequential course playback, quizzes, progress tracking, and certification.
- **Key Sections/Components:**
  - Course Sidebar (modules, progress)
  - Lesson Area (video, notes)
  - Quiz Modal (Q&A, feedback)
  - Progress Bar
  - Certificate Delivery (PDF, email)
  - Resume State

### 1.16 Checkout / Payment
- **Purpose:** Subscription purchase/upgrade, seat selection, payment entry, and receipt display.
- **Key Sections/Components:**
  - Plan Selector (tiers, add-ons)
  - Seat Quantity Selector
  - Payment Form (Stripe Elements)
  - Promo Code Field
  - Invoice Preview & Terms
  - Success/Receipt Page

### 1.17 Video Playback / Reel Page
- **Purpose:** Main player for micro-videos with metadata, transcripts, comments, bookmarks, and related clips.
- **Key Sections/Components:**
  - Video Player (HLS/DASH, captions, controls)
  - Clip Metadata (title, machine, tags)
  - Transcript Panel (jump-to)
  - AI Tags/Recommendations
  - Related Clips
  - Actions (bookmark, download, share, report)
  - Comments/Notes
  - Customer Access Badge

### 1.18 Dashboard
- **Purpose:** Personalized home with recent videos, assigned courses, search, and insights.
- **Key Sections/Components:**
  - Search Bar (suggestions, voice)
  - Recent/Favorite Clips
  - Assigned Courses Widget
  - Recommended Clips
  - Quick Actions
  - Notifications/Alerts
  - Right Insights Panel (managers)

### 1.19 Privacy Policy
- **Purpose:** Legal page describing data handling and privacy rights.
- **Key Sections/Components:**
  - Policy Text
  - Contact for Requests
  - Downloadable PDF

### 1.20 About / Help
- **Purpose:** Support center with FAQs, guides, contact, and support ticketing.
- **Key Sections/Components:**
  - Searchable FAQ
  - Guides (onboarding, best practices)
  - Contact Form & Ticketing
  - Support Chat Link
  - Release Notes/Roadmap

### 1.21 404 Not Found
- **Purpose:** Handles missing routes; directs users back to main areas.
- **Key Sections/Components:**
  - Error Message
  - Search Bar
  - Go Home CTA
  - Report Link

### 1.22 500 Server Error
- **Purpose:** Handles server errors and provides recovery guidance.
- **Key Sections/Components:**
  - Error Message
  - Retry Button
  - Contact Support Link

### 1.23 Loading / Success
- **Purpose:** Shows progress and success states for operations.
- **Key Sections/Components:**
  - Loading Spinner/Progress Bar
  - Success Toast/Modal (details, next steps)

### 1.24 Terms of Service
- **Purpose:** Legal terms for platform use and content rights.
- **Key Sections/Components:**
  - Terms Text
  - Accept Button

---

## 2. Features

### 2.1 Video Processing & Storage
- **Upload:** Chunked/resumable (tus/S3 multipart), client-side validation, progress UI.
- **Transcoding:** FFmpeg/cloud pipeline to HLS/DASH (multiple bitrates, captions).
- **Thumbnails:** Keyframe extraction for selection/upload.
- **Storage:** S3-compatible; encrypted at rest; CDN integration (CloudFront); signed streaming URLs.
- **Processing Jobs:** Queued via RabbitMQ/SQS; status and retry logic.
- **Security:** Per-customer content isolation; streaming via signed URLs.

### 2.2 Subscription & Billing
- **Provider:** Stripe integration (subscriptions, invoices, webhooks).
- **Features:** Plan selection, seat management, add-on libraries, proration, promo codes.
- **Billing:** Invoice delivery, payment method storage (tokens only), webhook sync, failed payment handling.
- **Admin:** Subscription summary, downloadable receipts, billing contacts.

### 2.3 Course Builder & Certification
- **Builder:** Drag-and-drop UI for assembling clips into modules/lessons.
- **Quizzes:** Multiple question types (MCQ, true/false), time limits, pass thresholds.
- **Tracking:** User progress, resume tokens, enrollment APIs (manual/bulk).
- **Certificate:** Signed PDF with unique verification ID; email delivery.
- **Audit:** Logs for completions/certificates.

### 2.4 Data Export/Import & Backup
- **Export:** CSV/JSON endpoints for content, user, and enrollment data.
- **Import:** Pipelines with validation/dry-run, error reporting.
- **Backup:** Automated DB/storage backups, retention, GDPR/CCPA compliance.

### 2.5 Search & Filter Functionality
- **Engine:** Elasticsearch/OpenSearch for transcripts and metadata.
- **Semantic:** Vector search (Pinecone/Supabase vectors) for similarity.
- **UI:** Faceted filters, boolean operators, autocomplete, typo-tolerance.
- **Analytics:** Query logging, ranking tuning.

### 2.6 Admin & Moderation Tools
- **RBAC:** Hierarchical roles, per-org & platform-wide.
- **Moderation:** Queues for flagged/pending content, rollback.
- **Allocation:** APIs/UI to map clips to customer libraries.
- **Audit:** Logs for all admin/content actions.
- **Monitoring:** Job queue/system health dashboard.

### 2.7 Transcription & AI Tagging
- **ASR:** Speech-to-text (Google/AWS/Azure) with diarization.
- **Transcripts:** Stored as text, generate VTT captions, editable with audit trail.
- **Tagging:** NLP pipeline for keywords, entity recognition, vector embedding for semantic search.
- **Queue:** Async transcription jobs, fallback/retry.

### 2.8 Offline Playback & Sync
- **PWA:** Service workers for caching/background sync.
- **Offline:** Selective downloads, encrypted local storage (Web Crypto).
- **Sync:** Conflict resolution for offline quiz attempts.
- **Bandwidth:** Download queues, storage quotas, secure remote wipe.

### 2.9 User Authentication & Security
- **Auth:** JWT access/refresh tokens (secure cookies), SAML/OIDC SSO, password hashing (bcrypt/argon2), 2FA (TOTP), session management.
- **Email Verification:** Token-based, rate-limited resend, expiration.
- **Magic Link:** Email-based passwordless login.
- **Session Control:** List/revoke sessions, backup codes for 2FA.

### 2.10 Notifications & Communication
- **Email:** Transactional via SendGrid/Mailgun (verification, receipts, notifications).
- **In-app:** Real-time (websockets/polling), notification center, digest scheduling.
- **Push:** Web Push for critical alerts (if allowed).
- **Preferences:** User/org-level opt-in/out, retry logic for delivery.

---

## 3. User Journeys

### 3.1 Curator Enters via Admin Invite
1. Receives admin invitation email → clicks link.
2. Sets password and completes profile.
3. Accesses Curator Dashboard.
4. Uploads new training reel (guided upload).
5. Reviews/edits transcription and AI tags.
6. Submits for review or publishes directly.
7. Builds course module from clips.
8. Assigns course to learners.
9. Monitors analytics and responds to moderation tasks.

### 3.2 Operator Direct Login
1. Navigates to login page.
2. Authenticates (email/password or SSO).
3. Accesses Operator Dashboard.
4. Searches for or browses training clips.
5. Plays training reel; bookmarks or saves clips.
6. Enrolls in assigned course.
7. Completes course and quiz.
8. Receives certificate and views progress.

### 3.3 Admin Enters via Direct URL
1. Navigates to admin page.
2. Authenticates (SSO/email).
3. Accesses Admin Dashboard.
4. Manages users (search/filter, role assignment).
5. Reviews moderation queue.
6. Allocates content to customer libraries.
7. Views analytics, monitors system health.
8. Configures organizational settings.

### 3.4 Engineer Enters via Email Link
1. Receives shared video or course link via email.
2. Clicks link, authenticates if required.
3. Views video detail page.
4. Saves/bookmarks or shares further.
5. Submits feedback or comment.
6. (If permitted) Publishes, submits for review, or assigns to team.

### 3.5 Checkout/Subscription Flow
1. Selects plan/add-ons on pricing page.
2. Proceeds to checkout.
3. Enters payment details (Stripe), applies promo code if any.
4. Reviews and accepts terms.
5. Completes purchase, receives confirmation and receipt.
6. Gets access to relevant content libraries.

### 3.6 Offline Use (PWA)
1. Marks clip or course for offline use.
2. Downloads content (progress indicator).
3. Uses video/course offline (shop floor).
4. Progress/quiz attempts sync when back online.

---

## 4. UI Guide

### 4.1 Color Palette
- **Primary:** Winbro Blue `#003F7F`
- **Secondary:** Industrial Gray `#444B54`
- **Accent:** Process Orange `#FF7C2D`
- **Success:** Emerald Green `#2ECC71`
- **Warning:** Amber `#FFC107`
- **Error:** Red `#E53935`
- **Background:** Light Gray `#F4F6FA`
- **Surface:** White `#FFFFFF`
- **Text Primary:** `#222E3A`
- **Text Secondary:** `#65748B`

### 4.2 Typography
- **Font Family:** Inter, Roboto, Arial, sans-serif
- **Heading Sizes:**
  - H1: 2.5rem, 700 weight
  - H2: 2rem, 600 weight
  - H3: 1.5rem, 600 weight
  - H4: 1.2rem, 500 weight
- **Body:** 1rem, 400 weight
- **Label/Caption:** 0.85rem, 500 weight
- **Line Height:** 1.5

### 4.3 Component Specs
- **Buttons:** Rounded 6px, 44px min height, color/variant tokens (primary, secondary, ghost, destructive), icon support, focus ring.
- **Inputs:** 40px height, 4px border-radius, subtle shadow, error/valid states, left icon slot.
- **Cards:** 12px radius, shadow, hover elevation, consistent padding (24px).
- **Modals:** Max width 540px, close icon, title bar, scrollable body.
- **Table/Grid:** Dense row option, sticky header, zebra striping, sort icons.
- **Player Controls:** Large touch targets, accessible, tooltips.
- **Progress Bar:** Animated, color-coded by status.
- **Toast/Alerts:** Top-right, auto-dismiss, action button.

### 4.4 Layout Principles
- **Grid:** 12-column responsive grid, 24px gutters.
- **Spacing:** 8px base unit, vertical rhythm.
- **Breakpoints:** Mobile (≤600px), Tablet (601–1024px), Desktop (≥1025px).
- **Navigation:** Left vertical nav (desktop), bottom nav (mobile), sticky header for search/CTAs.
- **Z-Order:** Modals > Navigation > Content > Background.

### 4.5 Visual Style & Mood
- **Overall Mood:** Professional, high-trust, industrial but modern.
- **Imagery:** Clean, technical, emphasizes real machines, tools, and hands-on context.
- **Iconography:** Custom set, geometric, high-contrast, reflects industrial concepts.
- **Motion:** Subtle transitions—fade-ins, slide for side panels, progress bar animation.
- **Accessibility:** WCAG AA: color contrast, focus indicators, keyboard navigation, ARIA labels.

### 4.6 Component Patterns
- **Search & Filter:** Debounced search, filter chips, clear filters control, saved searches.
- **Upload/Capture:** Stepper for progress, drag zones, camera preview, live validation.
- **Course Builder:** Drag handles, module grouping, real-time preview.
- **Quiz:** Large touch targets, immediate/deferred feedback option, timer

## Implementation Notes

When implementing this project:

1. **Follow Universal Guidelines**: Use the design best practices documented above as your foundation
2. **Apply Project Customizations**: Implement the specific design requirements stated in the "User Design Requirements" section
3. **Priority Order**: Project-specific requirements override universal guidelines when there's a conflict
4. **Color System**: Extract and implement color values as CSS custom properties in HSL format
5. **Typography**: Define font families, sizes, and weights based on specifications
6. **Spacing**: Establish consistent spacing scale following the design system
7. **Components**: Style all Shadcn components to match the design aesthetic
8. **Animations**: Use Motion library for transitions matching the design personality
9. **Responsive Design**: Ensure mobile-first responsive implementation

## Implementation Checklist

- [ ] Review universal design guidelines above
- [ ] Extract project-specific color palette and define CSS variables
- [ ] Configure Tailwind theme with custom colors
- [ ] Set up typography system (fonts, sizes, weights)
- [ ] Define spacing and sizing scales
- [ ] Create component variants matching design
- [ ] Implement responsive breakpoints
- [ ] Add animations and transitions
- [ ] Ensure accessibility standards
- [ ] Validate against user design requirements

---

**Remember: Always reference this file for design decisions. Do not use generic or placeholder designs.**
