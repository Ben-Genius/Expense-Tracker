# 🛠️ Expense Tracker - Testing Guide 📲

This document provides step-by-step instructions on **how to test the Expense Tracker app**.

## 🚀 Getting Started

### **1️⃣ Install Dependencies**
Clone  the specific repo (iOS or android) and Run the following command to install all required packages:
- **iOS Version**: [GitHub Repo](https://github.com/Ben-Genius/Expense-Tracker.git)
- **Android Version**: [GitHub Repo](https://github.com/Ben-Genius/Expense-Tracker/tree/androidVersion)

```bash
npm install
```

### **2️⃣ Start the App**
Use Expo CLI to launch the app:
```bash
npx expo start
```
Then, select one of the following options:
- **Press `a`** to run on an **Android Emulator** 📱
- **Press `i`** to run on an **iOS Simulator** 🍏
- **Scan QR Code** using **Expo Go** on your phone

---

## 🏆 **How to Test Features**

### **1️⃣ Onboarding Process**
- Open the app for the **first time**.
- Swipe through the onboarding slides.
- Click **Login** on the final screen.

📷 Screenshot:

![Onboard3](https://github.com/user-attachments/assets/eec92ffd-ed44-498b-89e7-da54d63cfad4) 
![Onboard2](https://github.com/user-attachments/assets/05b9437b-89d8-45ae-9b5e-213262a333c0)
---

### **2️⃣ Login Flow**
- Enter any username and password (no authentication required).
- Click **Sign In**.
- Verify that the app redirects to the **Dashboard**.

📷 Screenshot:
 [Login](https://github.com/user-attachments/assets/c87d7bf4-70ab-4a6b-a078-badc8fc166ea) 
 
![Signing-In](https://github.com/user-attachments/assets/ebcde421-26c4-45c0-b5fd-f81bf36e032f)
---

### **3️⃣ Dashboard Validation**
- Verify that the **Total Balance, Income, and Expenses** are displayed.
- Click on **Analytics** to view **Expense & Income Breakdown**.

📷 Screenshot:
  ![Homescreen](https://github.com/user-attachments/assets/52519fde-534a-475a-8358-7c7fc75949bb) 
[home~recentTransactions](https://github.com/user-attachments/assets/d97924d6-bc5d-4b72-aacf-8894a3623ac8) 
---

### **4️⃣ Adding an Expense**
- Navigate to the **Records** tab.
- Click the **"+ Button"**.
- Enter an **Expense Name, Amount, and Category**.
- Click **Save** and verify it appears in the expense list.

📷 Screenshot:
 ![all expenses](https://github.com/user-attachments/assets/6a70f37f-1d29-438f-b94f-407a4582ea4d)
 ![all-Income](https://github.com/user-attachments/assets/c9f1ef3b-5272-4bf8-97bb-e4fd5b4b39d5)
 ![AAdd Income](https://github.com/user-attachments/assets/79c57abf-0465-471d-b863-d4b2e4387e7b) 
 ![AddExpenses](https://github.com/user-attachments/assets/4789cef9-f420-43bb-8906-423f77ed0242)
 ![DetailScreen](https://github.com/user-attachments/assets/fe9da5bf-abcc-4da1-bf0c-3d87a633a064)
 ![EditExpenses/Income](https://github.com/user-attachments/assets/eeeca943-a4de-4371-9d71-9cec2b17bd98)
---

### **5️⃣ Viewing Statistics**
- Click on an expense from the **Records List**.
- Modify the amount or category.
- Click **Save Changes** and confirm the update.

📷 Screenshot:
 ![stats screen](https://github.com/user-attachments/assets/a14d8da8-586a-408a-8825-768af45ce66b)
 ![Statistics screen](https://github.com/user-attachments/assets/c3668351-b8a7-4d00-abbc-12654e3ba13e)
---

### **6️⃣ Settings & Logout**
- Navigate to **Settings**.
- Click **Logout**.
- Confirm that the app returns to the **Login Screen**.

📷 Screenshot:
![SettingsScreen](https://github.com/user-attachments/assets/9f41d3d6-2775-4e52-8d4d-a420302725ac)
| ![Logout](https://github.com/user-attachments/assets/bf0f0cad-0822-4a94-8451-57be7e07810b) 
---

## ✅ Final Testing Steps
Before submitting:
- Ensure that all features are **functional**.
- Run `npx expo start --clear` to reset the cache.
- Push your project to **GitHub**:
  ```bash
  git add .
  git commit -m "Final testing complete"
  git push origin main
  ```
- 📩 **Submit the GitHub link** to the provided email.

---

### 🎉 Congratulations! You have successfully tested the Expense Tracker app.

