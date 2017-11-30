import { Bot } from '../pages/profile/bot.model';

export class Request{
  question: string;
  answer: string;
}

export class BotRequest{
  customerFullName: string;
  customerPhoneNumber: string;
  bot: Bot;
  requests:Request[];
  answerDate: string;
  answerTime: string;
}
