import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './pages/chat/chat.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from "../shared/shared.module";
import { DateAgoPipePipe } from 'src/app/_helpers/date-ago-pipe.pipe';
import { InboxFilterPipe } from 'src/app/_helpers/inbox-filter.pipe';
import { GroupByDayPipe } from 'src/app/_helpers/groupByDay.pipe';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { ImageUplodComponent } from './components/image-uplod/image-uplod.component';
import { AudioComponent } from './components/audio/audio.component';
import { DocumentComponent } from './components/document/document.component';
import { VideoComponent } from './components/video/video.component';
import { LocationDetailsComponent } from './components/location-details/location-details.component';

@NgModule({
    declarations: [
        ChatComponent,
        DateAgoPipePipe,
        InboxFilterPipe,
        GroupByDayPipe,
        ImageUplodComponent,
        AudioComponent,
        DocumentComponent,
        VideoComponent,
        LocationDetailsComponent,

    ],
    imports: [
        CommonModule,
        ChatRoutingModule,
        ReactiveFormsModule,
        SharedModule,
        FormsModule,
        PickerComponent,

    ]
})
export class ChatModule { }
