# Email Phone Verification

An application that uses a one-time password (OTP) to validate users' email addresses and phone numbers. \
[Demo](https://www.youtube.com/watch?v=TVQog4RKZIk&ab_channel=AyushSachan)

## How it works?

The application uses nodejs and MongoDB in the backend. When the user hits the `/register` route with his/her email address/phone number

1. The controller saves the user data in the database.
1. Generates and saves the OTP with userId in the database.
1. With help of regular expression, it checks whether the given input is an email address or a phone number and sends the OTP accordingly to it, after that sending back the response to the client.
1. Client receives OTP, enters it, and hit the `/verify` route. If it is correct, the controller updates the database. If it is invalid, the controller will inform the client.

## Screenshots

-   Default view
    ![Default View](https://res.cloudinary.com/dyjs3mluc/image/upload/v1678881025/verification/Screenshot_2023-03-15_170243_sony6j.png)
-   If user already exists
    ![If user already exists](https://res.cloudinary.com/dyjs3mluc/image/upload/v1678881025/verification/Screenshot_2023-03-15_171342_jivjai.png)
-   Registering a new user
    ![Registering a new user](https://res.cloudinary.com/dyjs3mluc/image/upload/v1678881025/verification/Screenshot_2023-03-15_171402_jesrmf.png)

OTP sent to email address
![OTP on email](https://res.cloudinary.com/dyjs3mluc/image/upload/v1678881026/verification/Screenshot_2023-03-15_171441_tdk7lv.png)

If entered the wrong OTP
![If entered the wrong OTP](https://res.cloudinary.com/dyjs3mluc/image/upload/v1678881025/verification/Screenshot_2023-03-15_171457_c8b2jr.png)

Email verified
![Email verified](https://res.cloudinary.com/dyjs3mluc/image/upload/v1678881026/verification/Screenshot_2023-03-15_171509_iv7yge.png)

-   Same goes for phone number
    ![Same goes for phone number](https://res.cloudinary.com/dyjs3mluc/image/upload/v1678881025/verification/Screenshot_2023-03-15_171615_iupb7a.png)

In the database, `verified` field is updated to `true` upon successful verification.
![Database verification](https://res.cloudinary.com/dyjs3mluc/image/upload/v1678881853/verification/Screenshot_2023-03-15_172758_pd4q3x.png)

**Note: `email` field in the database is used interchangeably to store email and phone number.**
