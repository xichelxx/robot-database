# Security Specification: User Management, Notes & Favorites

## Data Invariants
1. A user cannot read, list or write another user's public info, favorites lists or personal notes collections.
2. A user cannot assign themselves the role of 'admin'.
3. The email field in the profile document must match the authenticated token email.
4. Timestamps (`createdAt`, `updatedAt`, `favoritedAt`) must match `request.time` exactly.
5. Path IDs must be alphanumeric strings, capped under 128 characters, to prevent ID poisoning.

## The Dirty Dozen Payloads (Security Attack Scenarios Tested)
1. **Admin Escalation Attack**: Attempt to write a `UserPublic` document structure setting `role: 'admin'`.
2. **Path Injection / Junk Characters ID Poisoning**: Trying to create a favorite with a bizarre `companyId` path component containing special symbols or massive lengths.
3. **Email Spoofing / Identity Theft**: Creating a User profile with an authenticated UID of User A, but setting the `email` field to User B's verified email.
4. **Blanket List Read Exploits**: Running a listing query over the main `/users` collection as a standard logged-in user.
5. **No-owner Cross Write**: Logging in as User X and writing into `/users/Y/favorites/company-alpha` to populate User Y's favorites.
6. **Future / Client Timestamp injection**: Supplying a custom `createdAt` representing 2030 instead of using `request.time`.
7. **Shadow Field Injection**: Saving extra fields in notes such as `{ "content": "note", "approvedByAdmin": true }`.
8. **Note Content Overload**: Writing an 11MB string as a note content (Rule restricts size to <= 10000 characters).
9. **Role Modification Bypass**: Modifying the existing user document to change `role` from 'user' to 'admin'.
10. **Immutability Breach**: Trying to update `createdAt` to reset account age features.
11. **Anonymized Profile Spoofing**: Attempting profiles writes with missing email verification context if requested.
12. **Favorite Record Cross-Update**: Attempting to alter `companyId` stored inside a favorites record after creation.
