<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\URL;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class VerifyEmail extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    /* public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->line('The introduction to the notification.')
            ->action('Notification Action', url('/'))
            ->line('Thank you for using our application!');
    } */

    public function toMail(object $notifiable): MailMessage
    {
        // Generar el enlace de verificación firmado con una expiración de 120 minutos
        $url = URL::temporarySignedRoute(
            'verification.verify', // Nombre de la ruta de verificación
            Carbon::now()->addMinutes(120), // Tiempo de expiración (120 minutos)
            ['id' => $notifiable->getKey(), 'hash' => sha1($notifiable->email)] // Pasar ID y hash
        );

        return (new MailMessage)
            ->line('Please click the button below to verify your email address.')
            ->action('Verify Email Address', $url) // Botón con el enlace de verificación
            ->line('If you did not create an account, no further action is required.')
            ->line('Thank you for using our application!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
