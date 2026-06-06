# SMS Setup Instructions for Portfolio Contact Form

## Setup Twilio for SMS Notifications

Follow these steps to enable SMS notifications when someone submits your contact form:

### 1. Create a Twilio Account
1. Go to [https://www.twilio.com/](https://www.twilio.com/)
2. Sign up for a free account
3. Complete the account verification process

### 2. Get Your Twilio Credentials
1. Go to your Twilio Console Dashboard
2. Copy your **Account SID** and **Auth Token**
3. Get a **Twilio Phone Number** (you can get a free trial number)

### 3. Configure Environment Variables
Update your `.env` file in the `backend/backend/` folder:

```env
# Replace these with your actual Twilio credentials
TWILIO_ACCOUNT_SID=your_actual_account_sid_here
TWILIO_AUTH_TOKEN=your_actual_auth_token_here
TWILIO_PHONE_NUMBER=your_actual_twilio_phone_number_here
YOUR_PHONE_NUMBER=+919306429693  # Your phone number to receive SMS
```

### 4. Add Credits (if needed)
- Twilio trial accounts come with some free credits
- For production use, you'll need to add payment method and credits
- SMS costs about $0.0075 per message in India

### 5. Test the Setup
1. Restart your backend server
2. Submit a test message through your contact form
3. You should receive an SMS with the message details

## SMS Message Format
You'll receive SMS notifications like this:
```
New Contact Message!
Name: John Doe
Email: john@example.com
Phone: +1234567890
Message: Hello, I want to work with you...
```

## Troubleshooting
- Make sure your Twilio phone number is verified
- Check that your phone number is in international format (+91...)
- Verify your Account SID and Auth Token are correct
- Check Twilio console logs for any errors

## Security Note
Keep your Twilio credentials secure and never commit them to version control!