import { OnQueueError, OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Config, Instance, User } from '@prisma/client';
import { Job } from 'bull';
import { InstancesService } from 'src/services/instances.service';

export type ProvisioningJob = Instance & {
  config: Config
  user: User
}

@Processor('provisioning')
export class ProvisioningConsumer {
  private readonly logger = new Logger(ProvisioningConsumer.name);

  constructor(
    private readonly instancesService: InstancesService
  ) { }

  @Process()
  async provision(job: Job<ProvisioningJob>) {
    await this.instancesService.initProvisioning(job.data);
    job.progress(100)

    return {};
  }

  @OnQueueError()
  onError(error: Error) {
    this.logger.error(error)
  }

  @OnQueueFailed()
  jobFailed(job: Job, err: Error) {
    this.logger.error(job.id, "failed", err)
  }
}