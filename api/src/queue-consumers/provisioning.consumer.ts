import { OnQueueError, OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Config, Instance, Product, Subscription, User } from '@prisma/client';
import { Job } from 'bull';
import { InstancesService } from '../services/instances.service';

export type ProvisioningJob = Instance & {
  config: Config;
  user: User;
  subscription: Subscription & { product: { slug: string; name: string } };
};

@Processor('provisioning')
export class ProvisioningConsumer {
  private readonly logger = new Logger(ProvisioningConsumer.name);

  constructor(private readonly instancesService: InstancesService) {}

  // By default `concurrency` is 1. Setting it
  // to 0 stops all jobs from being processed at all
  @Process({ concurrency: 1 })
  async provision(job: Job<ProvisioningJob>) {
    const n = await this.instancesService.initProvisioning(job.data);
    job.progress(n);

    if (n !== 100) {
      throw new Error(`job failed at ${n}%`);
    }

    return {};
  }

  @OnQueueError()
  onError(error: Error) {
    this.logger.error(error);
  }

  @OnQueueFailed()
  jobFailed(job: Job, err: Error) {
    this.logger.error(job.id, 'failed', err);
  }
}
