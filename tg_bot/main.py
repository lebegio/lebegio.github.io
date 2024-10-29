from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo
from telegram.ext import ApplicationBuilder, CommandHandler, ContextTypes, CallbackQueryHandler
import tg_bot.local_config as config

# Replace with your bot token
#web_app_url = "http://127.0.0.1:5000/"  # Replace with your server URL
web_app_url = "https://www.google.com/"
# test commit after repo renaming

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    # Create a button with WebApp info to open the inline web app
    keyboard = [
        [InlineKeyboardButton("Vote Here", web_app=WebAppInfo(url=web_app_url))]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    await update.message.reply_text("Click the button below to vote:", reply_markup=reply_markup)

# votes = {"option1": 0, "option2": 0}

# async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
#     keyboard = [
#         [InlineKeyboardButton("Vote for Option 1", callback_data='option1')],
#         [InlineKeyboardButton("Vote for Option 2", callback_data='option2')]
#     ]
#     reply_markup = InlineKeyboardMarkup(keyboard)
#     await update.message.reply_text("Please select an option to vote:", reply_markup=reply_markup)

# async def button(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
#     query = update.callback_query
#     await query.answer()  # Acknowledge the callback
#     print(f"Click!: {votes}")
#     # Increment the vote for the selected option
#     if query.data in votes:
#         votes[query.data] += 1
#         await query.edit_message_text(text=f"You voted for {query.data}!")

#     # Display current results
#     await query.message.reply_text(f"Current votes: Option 1 = {votes['option1']}, Option 2 = {votes['option2']}")

if __name__ == "__main__":
    app = ApplicationBuilder().token(config.BOT_TOKEN).build()
    
    # Add the /start handler to send the voting link
    app.add_handler(CommandHandler("start", start))
    #app.add_handler(CallbackQueryHandler(button))

    print("Bot is running...")
    app.run_polling()
