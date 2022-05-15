import { assert } from './util'
import Context from './context'
import { Middleware } from './middleware'

export function newReplies<C extends Context>(): Middleware<C> {
  return (ctx, next) => {
    function makeReply<E extends { reply_to_message_id?: number }>(extra?: E) {
      const ret = extra || ({} as E)
      ret.reply_to_message_id = ctx.message?.message_id
      return ret
    }

    // Disable replyWithChatAction in favour of respondWithChatAction
    ctx.replyWithChatAction = function () {
      throw new TypeError(
        'ctx.replyWithChatAction is removed, use respondWithChatAction instead'
      )
    }

    ctx.reply = function reply(text, extra) {
      assert(ctx, 'chat', 'reply')
      return ctx.telegram.sendMessage(ctx.chat.id, text, makeReply(extra))
    }

    ctx.replyWithAnimation = function replyWithAnimation(animation, extra) {
      assert(ctx, 'chat', 'replyWithAnimation')
      return ctx.telegram.sendAnimation(
        ctx.chat.id,
        animation,
        makeReply(extra)
      )
    }

    ctx.replyWithAudio = function replyWithAudio(audio, extra) {
      assert(ctx, 'chat', 'replyWithAudio')
      return ctx.telegram.sendAudio(ctx.chat.id, audio, makeReply(extra))
    }

    ctx.replyWithContact = function replyWithContact(
      phoneNumber,
      firstName,
      extra
    ) {
      assert(ctx, 'chat', 'replyWithContact')
      return ctx.telegram.sendContact(
        ctx.chat.id,
        phoneNumber,
        firstName,
        makeReply(extra)
      )
    }

    ctx.replyWithDice = function replyWithDice(extra) {
      assert(ctx, 'chat', 'replyWithDice')
      return ctx.telegram.sendDice(ctx.chat.id, makeReply(extra))
    }

    ctx.replyWithDocument = function replyWithDocument(document, extra) {
      assert(ctx, 'chat', 'replyWithDocument')
      return ctx.telegram.sendDocument(ctx.chat.id, document, makeReply(extra))
    }

    ctx.replyWithGame = function replyWithGame(gameName, extra) {
      assert(ctx, 'chat', 'replyWithGame')
      return ctx.telegram.sendGame(ctx.chat.id, gameName, makeReply(extra))
    }

    ctx.replyWithHTML = function replyWithHTML(html, extra) {
      assert(ctx, 'chat', 'replyWithHTML')
      return ctx.telegram.sendMessage(ctx.chat.id, html, {
        parse_mode: 'HTML',
        reply_to_message_id: ctx.message?.message_id,
        ...extra,
      })
    }

    ctx.replyWithInvoice = function replyWithInvoice(invoice, extra) {
      assert(ctx, 'chat', 'replyWithInvoice')
      return ctx.telegram.sendInvoice(ctx.chat.id, invoice, makeReply(extra))
    }

    ctx.replyWithLocation = function replyWithLocation(
      latitude,
      longitude,
      extra
    ) {
      assert(ctx, 'chat', 'replyWithLocation')
      return ctx.telegram.sendLocation(
        ctx.chat.id,
        latitude,
        longitude,
        makeReply(extra)
      )
    }

    ctx.replyWithMarkdown = function replyWithMarkdown(markdown, extra) {
      assert(ctx, 'chat', 'replyWithMarkdown')
      return ctx.telegram.sendMessage(ctx.chat.id, markdown, {
        parse_mode: 'Markdown',
        reply_to_message_id: ctx.message?.message_id,
        ...extra,
      })
    }

    ctx.replyWithMarkdownV2 = function replyWithMarkdownV2(markdown, extra) {
      assert(ctx, 'chat', 'replyWithMarkdownV2')
      return ctx.telegram.sendMessage(ctx.chat.id, markdown, {
        parse_mode: 'MarkdownV2',
        reply_to_message_id: ctx.message?.message_id,
        ...extra,
      })
    }

    ctx.replyWithPhoto = function replyWithPhoto(photo, extra) {
      assert(ctx, 'chat', 'replyWithPhoto')
      return ctx.telegram.sendPhoto(ctx.chat.id, photo, makeReply(extra))
    }

    ctx.replyWithPoll = function replyWithPoll(question, options, extra) {
      assert(ctx, 'chat', 'replyWithPoll')
      return ctx.telegram.sendPoll(
        ctx.chat.id,
        question,
        options,
        makeReply(extra)
      )
    }

    ctx.replyWithQuiz = function replyWithQuiz(question, options, extra) {
      assert(ctx, 'chat', 'replyWithQuiz')
      return ctx.telegram.sendQuiz(
        ctx.chat.id,
        question,
        options,
        makeReply(extra)
      )
    }

    ctx.replyWithSticker = function replyWithSticker(sticker, extra) {
      assert(ctx, 'chat', 'replyWithSticker')
      return ctx.telegram.sendSticker(ctx.chat.id, sticker, makeReply(extra))
    }

    ctx.replyWithVenue = function replyWithVenue(
      latitude,
      longitude,
      title,
      address,
      extra
    ) {
      assert(ctx, 'chat', 'replyWithVenue')
      return ctx.telegram.sendVenue(
        ctx.chat.id,
        latitude,
        longitude,
        title,
        address,
        makeReply(extra)
      )
    }

    ctx.replyWithVideo = function replyWithVideo(video, extra) {
      assert(ctx, 'chat', 'replyWithVideo')
      return ctx.telegram.sendVideo(ctx.chat.id, video, makeReply(extra))
    }

    ctx.replyWithVideoNote = function replyWithVideoNote(videoNote, extra) {
      assert(ctx, 'chat', 'replyWithVideoNote')
      return ctx.telegram.sendVideoNote(
        ctx.chat.id,
        videoNote,
        makeReply(extra)
      )
    }

    ctx.replyWithVoice = function replyWithVoice(voice, extra) {
      assert(ctx, 'chat', 'replyWithVoice')
      return ctx.telegram.sendVoice(ctx.chat.id, voice, makeReply(extra))
    }

    return next()
  }
}
