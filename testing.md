# Activity 4 – Test Plan (Manual Testing)

## Test environment
- Device: Laptop/PC (Chrome)
- Optional: Phone test using browser + responsive mode
- Storage: localStorage enabled

## Test cases

| Test ID | Feature | Steps | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|
| TC1 | Username validation | Leave username empty → Click **Enter Chat** | Error message appears |  |  |
| TC2 | Username length | Type 1 character → Enter Chat | Error shown (min 2 chars) |  |  |
| TC3 | Valid username | Type a valid username → Enter Chat | Goes to chat screen + username shown |  |  |
| TC4 | Send message (button) | Type message → Click **Send** | Message appears instantly with time |  |  |
| TC5 | Send message (Enter) | Type message → Press **Enter** | Message sends |  |  |
| TC6 | Prevent empty message | Type spaces only → Send | Nothing sends |  |  |
| TC7 | Auto-scroll | Send 6–10 messages | View scrolls to latest message |  |  |
| TC8 | Chat persistence | Send message → Refresh page | Messages still visible (saved) |  |  |
| TC9 | Theme toggle | Toggle theme → Refresh page | Theme stays the same |  |  |
| TC10 | Emoji support | Send message with emojis | Emojis display correctly |  |  |
| TC11 | Long message | Send a long message | Text wraps, no layout break |  |  |
| TC12 | Delete chat | Click **Delete Chat** → Confirm | Messages cleared + storage reset |  |  |
| TC13 | Change user | Click **Change User** | Returns to username screen |  |  |
| TC14 | Responsive layout | Resize window / phone view | No overlap, usable UI |  |  |

## Summary
Testing was completed manually by interacting with the website and checking results against expected behaviour.  
Any failed tests were fixed and re-tested until passing.

