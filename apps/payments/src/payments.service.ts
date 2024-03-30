import { NOTIFICATIONS_SERVICE } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import Stripe from 'stripe';
import { PaymentsCreateChargeDto } from './dto/payments-create-charge.dto';
import { Logger } from '@nestjs/common';


@Injectable()
export class PaymentsService {
  private logger = new Logger(PaymentsService.name)
  constructor(private readonly configService: ConfigService, @Inject(NOTIFICATIONS_SERVICE) private readonly notificationsService: ClientProxy) {}

  private readonly stripe = new Stripe(this.configService.get("STRIPE_SECRET_KEY"), {
    apiVersion: "2023-10-16"
  })

  async createCharge({  amount, email }: PaymentsCreateChargeDto) {
    const paymentMethod = await this.stripe.paymentMethods.create({
      type:'card',
      card: {
        token: "tok_visa"
      }
    })

    const paymentIntent = await this.stripe.paymentIntents.create({
      payment_method: paymentMethod.id,
      amount: amount * 100,
      confirm: true,
      payment_method_types: ['card'],
      currency: 'usd'
    })

    this.notificationsService.emit('notify_email', { email, text: `Seu pagamento de R$${amount} foi completado com sucesso!` })

    this.logger.log('Payment finished with success')

    return paymentIntent
  }

}
