import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MailService } from 'src/services/mail.service';

/** General purpose controller */
@ApiTags('Public')
@Controller('public')
export class PublicController {
  constructor(private readonly mailService: MailService) { }

  @Post('contact-form')
  dashboard(@Body() body) {
    const { email, name, subject, message } = body

    return this.mailService.contactForm(email, name, subject, message)
  }
}
