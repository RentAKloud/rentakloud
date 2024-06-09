import { MailerService } from '@nestjs-modules/mailer';
import { OnQueueError, OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

export type MailJob = {
  to: string
  from?: string
  subject: string
  template?: string
  html?: string
  context?: any
}

@Processor('mail')
export class MailConsumer {
  constructor(
    private mailerService: MailerService
  ) { }

  @Process()
  async sendMail(job: Job<MailJob>) {
    await this.mailerService.sendMail(job.data);
    job.progress(100)

    return {};
  }

  @OnQueueError()
  onError(error: Error) {
    console.log(error)
  }

  @OnQueueFailed()
  jobFailed(job: Job, err: Error) {
    console.log(job.id, "failed", err)
  }
}