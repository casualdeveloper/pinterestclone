export const removeMessage = (state, action) => {
    let messageStack = state.messageStack.slice(0);
    if(messageStack.length > 0)
        messageStack.splice(0, 1);

    return {
        messageStack
    }
}