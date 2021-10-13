<div class="tweet" *ngFor="let message of messages" >
    <h3>{{ message.title }}</h3><p>{{ message.text }}</p>
    <a [routerLink]="message.target">Read More</a>
</div>