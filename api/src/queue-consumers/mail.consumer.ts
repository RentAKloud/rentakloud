import { MailerService } from '@nestjs-modules/mailer';
import { OnQueueError, OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
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
  private readonly logger = new Logger(MailConsumer.name)

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
    this.logger.error(error.message)
  }

  @OnQueueFailed()
  jobFailed(job: Job, err: Error) {
    this.logger.error(`Job Failed ID=${job.id}`, err.message)
  }
}