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
    public function toMail(object $notifiable): MailMessage
    {
       /*  return (new MailMessage)
            ->line('The introduction to the notification.')
            ->action('Notification Action', url('/'))
            ->line('Thank you for using our application!'); */
             // Genera una URL firmada con expiración (ej: 24 horas)
    $signedUrl = URL::temporarySignedRoute(
        'ruta.verificacion', // Nombre de la ruta (debes definirlo)
        Carbon::now()->addHours(24), // Tiempo de expiración
        ['id' => $notifiable->getKey()] // Parámetros de la URL
    );

    return (new MailMessage)
        ->line('The introduction to the notification.')
        ->action('Notification Action', $signedUrl) // Usa la URL firmada
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
