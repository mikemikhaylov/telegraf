import { assert } from './util'
import Context from './context'
import { Middleware } from './middleware'

type ReplyContext = { [key in keyof Context & `reply${string}`]: Context[key] }

function makeReply<
  C extends Context,
  E extends { reply_to_message_id?: number }
>(ctx: C, extra?: E) {
  const ret = extra || ({} as E)
  ret.reply_to_message_id = ctx.message?.message_id
  return ret
}

const replyContext: ReplyContext = {
  replyWithChatAction: function () {
    throw new TypeError(
      'ctx.replyWithChatAction is removed, use respondWithChatAction instead'
    )
  },
  reply(text, extra) {
    assert(this, 'chat', 'reply')
    return this.telegram.sendMessage(this.chat.id, text, makeReply(this, extra))
  },
  replyWithAnimation(animation, extra) {
    assert(this, 'chat', 'replyWithAnimation')
    return this.telegram.sendAnimation(
      this.chat.id,
      animation,
      makeReply(this, extra)
    )
  },
  replyWithAudio(audio, extra) {
    assert(this, 'chat', 'replyWithAudio')
    return this.telegram.sendAudio(this.chat.id, audio, makeReply(this, extra))
  },
  replyWithContact(phoneNumber, firstName, extra) {
    assert(this, 'chat', 'replyWithContact')
    return this.telegram.sendContact(
      this.chat.id,
      phoneNumber,
      firstName,
      makeReply(this, extra)
    )
  },
  replyWithDice(extra) {
    assert(this, 'chat', 'replyWithDice')
    return this.telegram.sendDice(this.chat.id, makeReply(this, extra))
  },
  replyWithDocument(document, extra) {
    assert(this, 'chat', 'replyWithDocument')
    return this.telegram.sendDocument(
      this.chat.id,
      document,
      makeReply(this, extra)
    )
  },
  replyWithGame(gameName, extra) {
    assert(this, 'chat', 'replyWithGame')
    return this.telegram.sendGame(
      this.chat.id,
      gameName,
      makeReply(this, extra)
    )
  },
  replyWithHTML(html, extra) {
    assert(this, 'chat', 'replyWithHTML')
    return this.telegram.sendMessage(this.chat.id, html, {
      parse_mode: 'HTML',
      reply_to_message_id: this.message?.message_id,
      ...extra,
    })
  },
  replyWithInvoice(invoice, extra) {
    assert(this, 'chat', 'replyWithInvoice')
    return this.telegram.sendInvoice(
      this.chat.id,
      invoice,
      makeReply(this, extra)
    )
  },
  replyWithLocation(latitude, longitude, extra) {
    assert(this, 'chat', 'replyWithLocation')
    return this.telegram.sendLocation(
      this.chat.id,
      latitude,
      longitude,
      makeReply(this, extra)
    )
  },
  replyWithMarkdown(markdown, extra) {
    assert(this, 'chat', 'replyWithMarkdown')
    return this.telegram.sendMessage(this.chat.id, markdown, {
      parse_mode: 'Markdown',
      reply_to_message_id: this.message?.message_id,
      ...extra,
    })
  },
  replyWithMarkdownV2(markdown, extra) {
    assert(this, 'chat', 'replyWithMarkdownV2')
    return this.telegram.sendMessage(this.chat.id, markdown, {
      parse_mode: 'MarkdownV2',
      reply_to_message_id: this.message?.message_id,
      ...extra,
    })
  },
  replyWithMediaGroup(media, extra) {
    assert(this, 'chat', 'replyWithMediaGroup')
    return this.telegram.sendMediaGroup(
      this.chat.id,
      media,
      makeReply(this, extra)
    )
  },
  replyWithPhoto(photo, extra) {
    assert(this, 'chat', 'replyWithPhoto')
    return this.telegram.sendPhoto(this.chat.id, photo, makeReply(this, extra))
  },
  replyWithPoll(question, options, extra) {
    assert(this, 'chat', 'replyWithPoll')
    return this.telegram.sendPoll(
      this.chat.id,
      question,
      options,
      makeReply(this, extra)
    )
  },
  replyWithQuiz(question, options, extra) {
    assert(this, 'chat', 'replyWithQuiz')
    return this.telegram.sendQuiz(
      this.chat.id,
      question,
      options,
      makeReply(this, extra)
    )
  },
  replyWithSticker(sticker, extra) {
    assert(this, 'chat', 'replyWithSticker')
    return this.telegram.sendSticker(
      this.chat.id,
      sticker,
      makeReply(this, extra)
    )
  },
  replyWithVenue(latitude, longitude, title, address, extra) {
    assert(this, 'chat', 'replyWithVenue')
    return this.telegram.sendVenue(
      this.chat.id,
      latitude,
      longitude,
      title,
      address,
      makeReply(this, extra)
    )
  },
  replyWithVideo(video, extra) {
    assert(this, 'chat', 'replyWithVideo')
    return this.telegram.sendVideo(this.chat.id, video, makeReply(this, extra))
  },
  replyWithVideoNote(videoNote, extra) {
    assert(this, 'chat', 'replyWithVideoNote')
    return this.telegram.sendVideoNote(
      this.chat.id,
      videoNote,
      makeReply(this, extra)
    )
  },
  replyWithVoice(voice, extra) {
    assert(this, 'chat', 'replyWithVoice')
    return this.telegram.sendVoice(this.chat.id, voice, makeReply(this, extra))
  },
}

/**
 * Sets up Context to use the new reply methods.
 * ctx.reply() and ctx.replyWith*() methods will actually reply to the message they are replying to.
 * Use ctx.respond() to send a message in chat without replying to it.
 *
 * If the message to reply is deleted, reply() will send a normal message.
 * If the update is not a message and we are unable to reply, reply() will send a normal message.
 */
export function useNewReplies<C extends Context>(): Middleware<C> {
  return (ctx, next) => {
    Object.assign(ctx, replyContext)
    return next()
  }
}
