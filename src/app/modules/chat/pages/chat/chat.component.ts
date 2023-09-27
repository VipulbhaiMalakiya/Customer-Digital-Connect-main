import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subscription, delay, take } from 'rxjs';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { CustomersService } from 'src/app/_api/masters/customers.service';
import { ApiService } from 'src/app/_api/rxjs/api.service';
import { WhatsAppService } from 'src/app/_api/whats-app.service';
import { UserMaster } from 'src/app/_models';
import { MessageData } from 'src/app/_models/meesage';
import { ConfirmationDialogModalComponent } from 'src/app/modules/shared/components/confirmation-dialog-modal/confirmation-dialog-modal.component';
import { environment } from 'src/environments/environment';
import { DatePipe, Location } from '@angular/common';
import * as $ from 'jquery';
import * as jQuery from 'jquery';

import { Title } from '@angular/platform-browser';
import { labelMasterModel } from 'src/app/_models/labels';
import { ImageUplodComponent } from '../../components/image-uplod/image-uplod.component';
import { AudioComponent } from '../../components/audio/audio.component';
import { DocumentComponent } from '../../components/document/document.component';
import { VideoComponent } from '../../components/video/video.component';
import { LocationDetailsComponent } from '../../components/location-details/location-details.component';
import { QuickReplyComponent } from '../../components/quick-reply/quick-reply.component';
import { TempletsComponent } from '../../components/templets/templets.component';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewChecked {
  show: boolean = false;
  data: any = [];
  bgclass: any;
  lastMessageTime?: number; // Timestamp of the last message
  timeRemaining?: number;
  targetFormat?: string = 'yyyy-MM-ddTHH:mm:ss';
  messageCount: number = 0;
  lastItem?: any;
  chatVisible: boolean = true;
  isProceess: boolean = true;
  firstname: any;
  lastname: any;
  userData: any;
  totalQuantity?: number = 0;
  userMessage = [];
  chatname: any;
  label: any;
  latitude?: number;
  longitude?: number;
  Userinfo?: any;
  quickReplydata: any = [];
  closedCount?: any;
  messageList: string[] = [];
  private socket$!: WebSocketSubject<any>;
  public receivedData: MessageData[] = [];
  item: any = [];
  open: any = [];
  contact: any;
  closed: any = [];
  aciveUser: UserMaster[] = [];
  dataLabel: labelMasterModel[] = [];
  term: any;
  contactId?: any;
  contactinfo?: any;
  messagestates?: any = '';
  masterName?: any;
  nrSelect?: any;
  subscription?: Subscription;
  showHead: boolean = false;
  private socket?: WebSocket;
  contactList: any;
  meesagestatus?: any = [];
  isempty: boolean = true;
  reloadFlag = true;
  openCount: any;
  tqty?: any;
  DefoluteSelect: any;
  @ViewChild('chatContainer', { static: false }) chatContainer!: ElementRef;
  // Emoji Code Start
  message = '';
  showEmojiPicker = false;
  showupload = false;
  showupload1 = false;
  private notificationSound?: HTMLAudioElement;

  toggleEmojiPicker() {
    this.showupload = false;
    this.showupload1 = false;
    this.showEmojiPicker = !this.showEmojiPicker;
  }
  addEmoji(event: any) {
    const { message } = this;
    const text = `${message}${event.emoji.native}`;
    this.message = text;
    // this.showEmojiPicker = false;
    this.showEmojiPicker = false;
  }

  onOutsideClick(): void {
    this.showEmojiPicker = false;
  }

  onFocus() {
    this.showEmojiPicker = false;
  }

  replaceAndBoldPlaceholder(data?: any): any {
    // Check if data is defined
    if (!data) {
      return 'Data is undefined or null.';
    }

    // Check if data has the necessary properties
    if (
      !data.templateBodyAttributes ||
      data.templateBodyAttributes.length === 0
    ) {
      return 'templateBodyAttributes is missing or empty.';
    }

    const name = data.templateBodyAttributes[0];

    // Check if the originalString exists and contains the placeholder
    if (!data.templatePreview || !data.templatePreview.includes('{{1}}')) {
      return 'originalString is missing or does not contain {{1}} placeholder.';
    }

    const originalString = data.templatePreview;
    const replacedString = originalString.replace('{{1}}', name);
    return replacedString;
  }

  replaceAndBoldPlaceholder1(data?: any): any {
    try {
      if (
        !data ||
        !data.templateBodyAttributes ||
        data.templateBodyAttributes.length < 3 ||
        !data.templatePreview
      ) {
        // Handle the case where data is missing or incomplete
        throw new Error('Invalid data or missing attributes');
      }

      const name = data.templateBodyAttributes[0];
      const un = data.templateBodyAttributes[1];
      const pwd = data.templateBodyAttributes[2];
      const originalString = data.templatePreview;

      // Use regular expressions to replace all occurrences of {{1}}, {{2}}, and {{3}}
      const replacedString = originalString
        .replace(/{{1}}/g, name)
        .replace(/{{2}}/g, un)
        .replace(/{{3}}/g, pwd);

      return replacedString;
    } catch (error) {
      // Handle the error here, e.g., log it or return a default value
      console.error('Error in replaceAndBoldPlaceholder1:', error);
      return 'Error: Unable to replace placeholders';
    }
  }
  //Emoji Code End
  constructor(
    private _route: ActivatedRoute,
    public CSAPI: CustomersService,
    private formBuilder: FormBuilder,
    public whatsappService: WhatsAppService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private apiService: ApiService,
    private router: Router,
    private location: Location,
    private titleService: Title,
    private cd: ChangeDetectorRef,
    private datePipe: DatePipe
  ) {
    const d: any = localStorage.getItem('userData');
    this.userData = JSON.parse(d);
    this.nrSelect = this.userData?.userId;
    this.titleService.setTitle('CDC -Inbox');
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.connect();
      this.GetUser();
      this.ActiveUser();
      this.getContactList();
      this.ActiveLabels();
    }, 2000);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.data.latitude = position.coords.latitude.toString();
        this.data.longitude = position.coords.longitude.toString();
      });
    }

    $('.select-dropdown__button').on('click', function () {
      $('.select-dropdown__list').toggleClass('active');
    });

    $('.select-dropdown__list-item').on('click', function () {
      const itemValue = $(this).data('value') as string;
      $('.select-dropdown__button span')
        .text($(this).text())
        .parent()
        .attr('data-value', itemValue);
      $('.select-dropdown__list').toggleClass('active');
    });
    $('.topchat-filter-icon').on('click', (event: Event) => {
      event.stopPropagation();
      $('.filters-popup').toggle();
    });

    $('.filters-popup').on('click', (event: Event) => {
      event.stopPropagation();
    });

    $(document).on('click', () => {
      $('.filters-popup').hide();
    });
  }
  display: any;
  zoom = 4; // Initial zoom level for the map
  move(event: google.maps.MapMouseEvent) {
    // Method to handle map click event and update the display property
    if (event.latLng != null) {
      this.display = event.latLng.toJSON();
    }
  }

/**
 * The `connect` function establishes a WebSocket connection and subscribes to incoming messages,
 * handling them based on their status and type.
 */
  public connect(): void {
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = webSocket(environment.SOCKET_ENDPOINT);
      this.socket$.subscribe((data: MessageData) => {
        console.log(data);
        this.messagestates = data.messageStatus;
        if (data.mobileNo === this.contact) {
          this.receivedData.push(data);
        } else if (data.mobileNo !== this.contact) {
          this.getContactList();
        }
        if (
          this.messagestates == 'sent' ||
          this.messagestates == 'delivered' ||
          this.messagestates == 'read' ||
          this.messagestates == ' '
        ) {
        } else {
          const currentUrl = this.location.path();
          if (currentUrl === '/admin/inbox' || currentUrl === '/inbox') {
            if (data.type === 'Receiver') {
              const message: string = `You got a message from ${data.name}`;
              this.speakNotification(message);
            } else {
              const audio = new Audio(
                // '../../../../../assets/sound/Whatsapp Message - Sent - Sound.mp3'
              );
              audio.play();
            }
          }
        }
      });
    }
  }

/**
 * The function `speakNotification` uses the Web Speech API to convert a given message into speech and
 * speak it out loud.
 * @param {string} message - The `message` parameter is a string that represents the text that you want
 * to be spoken out loud.
 */
  private speakNotification(message: string) {
    const speechSynthesis = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
  }
/**
 * The function "toggleupload" toggles the visibility of an upload feature and hides an emoji picker.
 */
  toggleupload() {
    this.showEmojiPicker = false;
    this.showupload1 = false;
    this.showupload = !this.showupload;
  }
 /**
  * The function "togglecart" toggles the value of "showupload1" between true and false.
  */
  togglecart() {
    this.showEmojiPicker = false;
    this.showupload = false;
    this.showupload1 = !this.showupload1;
  }
  // Download code start


/**
 * The `downloadFile` function creates a link element, sets its attributes to the provided file URL and
 * filename, appends it to the document body, triggers a click event on the link to initiate the file
 * download, and finally removes the link element from the document body.
 * @param {any} e - The parameter "e" is of type "any", which means it can be any type of data. It is
 * likely an event object that contains information about the file to be downloaded, such as the file
 * URL and filename.
 */
  downloadFile(e: any) {
    const link = document.createElement('a');
    link.setAttribute('href', e.fileUrl);
    link.setAttribute('download', e.filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
/**
 * The function `downloadFile1` creates a link element, sets its attributes for downloading a file,
 * appends it to the document body, triggers a click event on the link, and then removes the link from
 * the document body.
 * @param {any} e - The parameter "e" is of type "any", which means it can be any type of data.
 */
  downloadFile1(e: any) {
    const link = document.createElement('a');
    link.setAttribute('href', e.templateHeaderfileLink);
    link.setAttribute('download', e.templateName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  // Download code end
/**
 * The function "ActiveLabels" retrieves active labels from an API and assigns the data to a variable.
 */
  ActiveLabels() {
    this.isProceess = true;
    this.masterName = '/label/active';
    this.subscription = this.apiService
      .getAll(this.masterName)
      .pipe(take(1))
      .subscribe(
        (data) => {
          this.dataLabel = data.data;
          this.isProceess = false;
        },
        (error) => {
          this.isProceess = false;
        }
      );
  }
/**
 * The function checks if an element is overflowing horizontally.
 * @param {any} el - The "el" parameter represents an element in the DOM (Document Object Model). It
 * can be any HTML element such as a div, span, p, etc.
 * @returns a boolean value indicating whether the element's content is overflowing horizontally.
 */

  isOverflowing(el: any) {
    return el.offsetWidth < el.scrollWidth;
  }
/**
 * The `getColorClass` function returns a color class based on the index provided, using a repeated
 * pattern of predefined colors.
 * @param {number} index - The `index` parameter is a number that represents the position of the color
 * in the `colors` array.
 * @returns a string representing a color class. The color class is determined based on the index
 * provided as an argument to the function. The index is used to calculate the color index by taking
 * the remainder when divided by the length of the colors array. The color index is then used to access
 * the corresponding color class from the colors array, which is returned by the function.
 */
  getColorClass(index: number): string {
    const colors = [
      'color1',
      'color2',
      'color3',
      'color4',
      'color5',
      'color6',
      'color7',
    ]; // Define the colors in a repeated pattern
    const colorIndex = index % colors.length; // Get the color index based on the remainder
    return colors[colorIndex];
  }

/**
 * The function `ActiveUser()` retrieves active user data from an API and assigns it to the
 * `activeUser` variable.
 */
  ActiveUser() {
    this.isProceess = true;
    this.masterName = '/users/active';
    this.subscription = this.apiService
      .getAll(this.masterName)
      .pipe(take(1))
      .subscribe(
        (data) => {
          this.aciveUser = data;
          this.isProceess = false;
        },
        (error) => {
          this.isProceess = false;
        }
      );
  }

/**
 * The ngAfterViewChecked function is used in Angular to scroll to the bottom of a view after it has
 * been checked for any changes.
 */
  ngAfterViewChecked() {
    this.scrollToBottom();
  }

 /**
  * The function `getShortName` takes an optional `fullName` parameter and returns the first character
  * of the `fullName` string.
  * @param {any} [fullName] - The fullName parameter is a string that represents a person's full name.
  * @returns the first character of the `fullName` string.
  */
  getShortName(fullName?: any) {
    return fullName.charAt(0);
    // return fullName?.split(' ').map((n: any[]) => n[0]).join('');
  }

 /**
  * The ngAfterViewInit function is used to scroll to the bottom of a page after the view has been
  * initialized.
  */
  ngAfterViewInit() {
    // this.scrollToBottom();
  }


/**
 * The scrollToBottom function scrolls the chat container to the bottom.
 */


  scrollToBottom(): void {
    try {
      if (this.chatContainer) { // Check if chatContainer is defined
        const container = this.chatContainer.nativeElement;
        const shouldScroll = container.scrollTop + container.clientHeight >= container.scrollHeight;

        if (!shouldScroll) {
          container.scrollTop = container.scrollHeight;
        }
      }
    } catch (err) {
      console.error(err);
    }
  }



/**
 * The function `GetUser()` retrieves user data based on the provided ID and performs additional
 * operations on the data.
 */
  GetUser() {
    if (this._route.snapshot.paramMap.get('id') != null) {
      this.show = true;
      this.subscription = this.CSAPI.customerDetailByID(
        this._route.snapshot.paramMap.get('id')
      )
        .pipe(take(1))
        .subscribe({
          next: (data: any) => {
            if (data) {
              this.data = data;
              this.isProceess = false;
              this.firstname = data.firstName;
              this.lastname = data.lastName;
              this.chathistroy();
              let phone = this.data.contact;
              this.masterName = `/chat-activity/${phone}`;
              this.subscription = this.apiService
                .getAll(this.masterName)
                .pipe(take(1))
                .subscribe(
                  (data) => {
                    this.Userinfo = data;
                    this.contactinfo = data;
                    this.nrSelect = this.Userinfo?.assignedto;
                    this.isProceess = false;
                    this.cd.detectChanges();
                  },
                  (error) => {
                    this.isProceess = false;
                  }
                );
              this.scrollToBottom();
            }
          },
          error: (e) => console.error(e),
        });
    } else {
      this.isProceess = false;
      this.scrollToBottom();
    }
    this.isProceess = false;
  }
/**
 * The `getContactList()` function retrieves a contact list based on the user's role and updates the
 * component's properties accordingly.
 */

  getContactList() {
    // this.isProceess = true;
    if (this.userData?.role?.roleName === 'Admin') {
      this.subscription = this.whatsappService
        .getContactList()
        .pipe(take(1))
        .subscribe(
          (response) => {
            this.contactList = response;
            this.open = this.contactList[0].open;
            this.openCount = this.contactList[0].openCount;
            this.closedCount = this.contactList[0].closedCount;
            this.closed = this.contactList[0].closed;
            this.isProceess = false;
          },
          (error) => {
            this.isProceess = false;
          }
        );
    } else {
      this.subscription = this.whatsappService
        .getContactListForUser(this.userData?.userId)
        .pipe(take(1))
        .subscribe(
          (response) => {
            this.contactList = response;
            this.open = this.contactList[0].open;
            this.openCount = this.contactList[0].openCount;
            this.closedCount = this.contactList[0].closedCount;
            this.closed = this.contactList[0].closed;
            this.label = this.isProceess = false;
          },
          (error) => {
            this.isProceess = false;
          }
        );
    }
  }

/**
 * The `chathistory` function retrieves the chat history for a given phone number using the WhatsApp
 * service and assigns the response to the `item` variable.
 */
  chathistroy() {
    let phone: any = this.data?.contact;
    this.isProceess = true;
    this.whatsappService
      .chatHistory(phone)
      .pipe(take(1))
      .subscribe(
        (response) => {
          this.item = response;
          this.receivedData = this.item;
          this.isProceess = false;
        },
        (error) => {
          this.isProceess = false;
        }
      );
  }
 /**
  * The function `onViewContact` is used to display contact information and chat history for a selected
  * contact.
  * @param {any} e - The parameter `e` is an object that represents contact information. It contains
  * properties such as `id`, `fullName`, `phoneNo`, and `customerLabel`.
  * @param {any} c - The parameter `c` is used to set the background class for the contact. It is
  * likely used for styling purposes.
  */
  onViewContact(e: any, c: any) {
    this.contactinfo = e;
    this.bgclass = c;
    this.contactId = e.id;
    this.showEmojiPicker = false;
    this.showupload = false;
    this.showupload1 = false;
    this.contact = e.phoneNo;
    this.show = true;
    if (e.fullName) {
      this.chatname = e.fullName;
    } else {
      this.chatname = e.phoneNo;
    }
    this.label = e.customerLabel;
    this.isProceess = true;
    this.subscription = this.whatsappService
      .chatHistory(e.phoneNo)
      .pipe(take(1))
      .subscribe(
        (response) => {
          this.item = response;
          this.receivedData = this.item;
          const lstRe = this.receivedData.slice(-1)[0];
          this.lastItem = lstRe.time;
          this.lastMessageTime = this.lastItem;
          if (lstRe.mobileNo === e.phoneNo) {
            // this.checkChatStatus();
          }

          this.isProceess = false;
          this.masterName = `/chat-activity/${e.phoneNo}`;
          this.subscription = this.apiService
            .getAll(this.masterName)
            .pipe(take(1))
            .subscribe(
              (data) => {
                this.Userinfo = data;
                this.nrSelect = this.Userinfo?.assignedto;
                if (this.nrSelect === this.Userinfo?.assignedto) {
                  const foundItem = this.aciveUser.find(
                    (item) => item.userId === this.Userinfo?.assignedto
                  );
                  if (foundItem) {
                    this.DefoluteSelect =
                      foundItem.firstName + ' ' + foundItem.lastName;
                  } else {
                    this.DefoluteSelect =
                      this.Userinfo?.firstName + ' ' + this.Userinfo?.lastName;
                  }
                }

                this.isProceess = false;
                this.cd.detectChanges();
              },
              (error) => {
                this.isProceess = false;
              }
            );
        },
        (error) => {
          this.isProceess = false;
        }
      );
  }
/**
 * The function checks if the last message time is within the last 24 hours and updates the chat
 * visibility and message accordingly.
 */
  // checkChatStatus() {
  //   this.message = '';
  //   this.chatVisible = true;
  //   const currentTime = new Date();
  //   const date: any =
  //     this.datePipe.transform(this.lastMessageTime, this.targetFormat) || '';
  //   const next24Hours = new Date(date);
  //   next24Hours.setHours(next24Hours.getHours() + 24);
  //   const timeDifference = next24Hours.getTime() - currentTime.getTime();
  //   if (timeDifference <= 0) {
  //     this.chatVisible = false;
  //     this.message =
  //       'Outgoing message not allowed. Latest message not within the last 24 hours.';
  //   } else {
  //     setTimeout(() => {
  //       this.message = '';
  //       this.checkChatStatus();
  //     }, timeDifference);
  //   }
  // }

/**
 * The `onlabel` function updates a customer's label and displays a success message if the update is
 * successful, or an error message if it fails.
 * @param {any} e - The parameter "e" is of type "any", which means it can be any data type.
 */
  onlabel(e: any) {
    this.masterName = `/customer/label-update/${this.contact}/${e.id}`;
    let updateData: any = {
      url: this.masterName,
    };
    // this.isProceess = true;
    this.subscription = this.apiService
      .update(updateData)
      .pipe(take(1))
      .subscribe(
        (res) => {
          this.toastr.success(res.message);
          this.isProceess = false;
          this.getContactList();
          this.label = e.name;
        },
        (error) => {
          this.toastr.error(error.message);
          this.isProceess = false;
        }
      );
  }

/**
 * The `onlabelRemove` function opens a confirmation dialog modal and if the user confirms the removal,
 * it sends a delete request to the server and updates the contact list.
 * @param {any} e - The parameter `e` is of type `any`, which means it can accept any type of value. It
 * is likely an event object that is passed to the function when it is triggered.
 */
  onlabelRemove(e: any) {
    this.isProceess = true;
    const modalRef = this.modalService.open(ConfirmationDialogModalComponent, {
      size: 'sm',
      centered: true,
      backdrop: 'static',
    });
    if (modalRef) {
      this.isProceess = false;
    } else {
      this.isProceess = false;
    }
    var componentInstance =
      modalRef.componentInstance as ConfirmationDialogModalComponent;
    componentInstance.message = 'Are you sure you want to remove this ?';
    modalRef.result
      .then((canDelete: boolean) => {
        if (canDelete) {
          this.masterName = `/customer/label-remove/${this.contact}`;
          this.subscription = this.apiService
            .deleteID(this.masterName)
            .pipe(take(1))
            .subscribe(
              (res) => {
                this.label = '';
                this.isProceess = false;
                this.toastr.success(res.message);
                this.getContactList();
              },
              (error) => {
                this.isProceess = false;
                this.toastr.error(error.message);
              }
            );
        }
      })
      .catch(() => {});
  }

 /**
  * The `submitNoteForm` function sends a WhatsApp message with a note, using the provided form data.
  * @param {any} form - The `form` parameter is an object that represents a form in the application. It
  * is used to validate the form and retrieve the values entered by the user.
  */
  submitNoteForm(form: any) {
    if (form.valid) {
      let phone;
      if (this.contact === undefined) {
        phone = this.data.contact;
      } else {
        phone = this.contact;
      }
      var request = {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: this.contactinfo?.phoneNo,
        type: 'notes',
        fromId: this.userData?.userId,
        assignedto: this.userData?.userId,
        names: this.contactinfo?.fullName || null,
        text: {
          preview_url: false,
          body: form.value.note,
        },
      };
      let formData = new FormData();
      formData.append('messageEntry', JSON.stringify(request));
      // this.isProceess = true;
      this.subscription = this.whatsappService
        .sendWhatsAppMessage(formData)
        .pipe(take(1))
        .subscribe(
          (response) => {
            let data: any = response;
            this.toastr.success(data.message);
            this.isProceess = false;
            this.showEmojiPicker = false;
            form.reset();
            this.scrollToBottom();
            const audio = new Audio(
              '../../../../../assets/sound/Whatsapp Message - Sent - Sound.mp3'
            );
            audio.play();
          },
          (error) => {
            this.toastr.error(error.error.message);
            this.isProceess = false;
            form.reset();
          }
        );
    }
  }

/**
 * The function `quickReply()` opens a modal window to display a QuickReplyComponent, and assigns the
 * selected message to the variable `this.message`.
 */
  quickReply() {
    this.isProceess = true;
    this.showupload = false;
    this.showupload1 = false;
    this.showEmojiPicker = false;
    const modalRef = this.modalService.open(QuickReplyComponent, {
      size: 'md',
      centered: true,
      backdrop: 'static',
    });
    if (modalRef) {
      this.isProceess = false;
    } else {
      this.isProceess = false;
    }
    modalRef.result
      .then((data: any) => {
        this.message = data;
      })
      .catch(() => {});
  }
/**
 * The `submitForm` function sends a WhatsApp message using the provided form data if the form is
 * valid.
 * @param {any} form - The `form` parameter is an object that represents a form in the application. It
 * is used to access the values and validity of the form fields.
 */
  submitForm(form: any) {
    if (form.valid) {
      var request = {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: this.contactinfo?.phoneNo,
        type: 'text',
        fromId: this.userData?.userId,
        assignedto: this.userData?.userId,
        names: this.contactinfo?.fullName || null,
        text: {
          preview_url: false,
          body: form.value.chat,
        },
      };
      let formData = new FormData();
      formData.append('messageEntry', JSON.stringify(request));
      // this.isProceess = true;
      this.subscription = this.whatsappService
        .sendWhatsAppMessage(formData)
        .pipe(take(1))
        .subscribe(
          (response) => {
            let data: any = response;
            this.toastr.success(data.message);
            this.isProceess = false;
            this.showEmojiPicker = false;
            form.reset();
            this.scrollToBottom();
             const audio = new Audio(
              '../../../../../assets/sound/Whatsapp Message - Sent - Sound.mp3'
            );
            audio.play();
          },
          (error) => {
            this.toastr.error(error.error.message);
            this.isProceess = false;
            form.reset();
          }
        );
    }
  }

/**
 * The function `sendingCatalog` sends a WhatsApp message with a catalog to an individual recipient.
 * @param {any} e - The parameter "e" is the name of the interactive catalog that you want to send. It
 * is passed as an argument to the "sendingCatalog" function.
 */
  sendingCatalog(e: any) {
    var request = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: this.contactinfo?.phoneNo,
      type: 'interactive',
      fromId: this.userData?.userId,
      assignedto: this.userData?.userId,
      fullname: this.contactinfo?.fullName || null,
      interactiveName: e,
    };
    let formData = new FormData();
    formData.append('messageEntry', JSON.stringify(request));
    this.isProceess = true;
    this.subscription = this.whatsappService
      .sendWhatsAppMessage(formData)
      .pipe(take(1))
      .subscribe(
        (response) => {
          let data: any = response;
          this.toastr.success(data.message);
          this.isProceess = false;
          this.showupload1 = false;
          this.showEmojiPicker = false;
          this.scrollToBottom();
          const audio = new Audio(
            '../../../../../assets/sound/Whatsapp Message - Sent - Sound.mp3'
          );
          audio.play();
        },
        (error) => {
          this.toastr.error(error.error.message);
          this.isProceess = false;
        }
      );
  }

 /**
  * The ngOnDestroy function is used to unsubscribe from a subscription and complete a socket
  * connection.
  */
  ngOnDestroy() {
    // this.socket$.complete();
    this.subscription?.unsubscribe();
  }
/**
 * The `onClose` function is used to handle the closing of a chat, displaying a confirmation dialog and
 * performing various API calls based on the user's response.
 * @param {any} contactinfo - The `contactinfo` parameter is an object that contains information about
 * the contact, such as their phone number (`phoneNo`).
 */
  onClose(contactinfo: any) {
    this.isProceess = true;
    const modalRef = this.modalService.open(ConfirmationDialogModalComponent, {
      size: 'sm',
      centered: true,
      backdrop: 'static',
    });
    if (modalRef) {
      this.isProceess = false;
    } else {
      this.isProceess = false;
    }
    var componentInstance =
      modalRef.componentInstance as ConfirmationDialogModalComponent;
    componentInstance.message = 'Are you sure you want to close this chat?';

    modalRef.result
      .then((canDelete: boolean) => {
        if (canDelete) {
          let data: any = {
            mobileNo: contactinfo.phoneNo,
            messagetype: 'closed',
            fromId: this.userData.userId,
          };
          this.masterName = `/chat-activity/closed`;
          let addData: any = {
            url: this.masterName,
            model: data,
          };
          this.isProceess = true;
          this.subscription = this.apiService
            .add(addData)
            .pipe(take(1))
            .subscribe(
              (res) => {
                if (res.status == 'Success') {
                  this.toastr.success(res.message);
                  this.isProceess = false;
                  this.subscription = this.whatsappService
                    .chatHistory(data.mobileNo)
                    .pipe(take(1))
                    .subscribe(
                      (response) => {
                        this.item = response;
                        this.receivedData = this.item;
                        this.isProceess = false;
                        this.masterName = `/outgoing-activity/${data.mobileNo}`;
                        this.subscription = this.apiService
                          .getAll(this.masterName)
                          .pipe(take(1))
                          .subscribe(
                            (data) => {
                              this.Userinfo = data;
                              this.nrSelect = this.Userinfo.assignedto;
                              this.isProceess = false;
                              this.cd.detectChanges();
                            },
                            (error) => {
                              this.isProceess = false;
                            }
                          );
                        this.getContactList();
                      },
                      (error) => {
                        this.isProceess = false;
                      }
                    );
                }
                if (res.status == 'failed') {
                  this.toastr.error(res.message);
                  this.isProceess = false;
                }
              },
              (error) => {
                this.isProceess = false;
                this.toastr.error(error.error.message);
              }
            );
        }
      })
      .catch(() => {});
  }

/**
 * The `selectDepartment` function assigns a department to a contact and performs various API calls and
 * data manipulations.
 * @param {any} e - The parameter `e` is the value selected from the department dropdown. It represents
 * the department to which the contact will be assigned.
 */
  selectDepartment(e: any) {
    let phone;
    if (this.contact == undefined) {
      phone = this.data.contact;
    } else {
      phone = this.contact;
    }
    let data = {
      mobileNo: phone,
      messagetype: 'assigned',
      assignedto: e,
      fromId: this.userData.userId,
    };
    this.masterName = `/chat-activity/assigned`;
    let addData: any = {
      url: this.masterName,
      model: data,
    };
    this.isProceess = true;
    this.subscription = this.apiService
      .add(addData)
      .pipe(take(1))
      .subscribe(
        (res) => {
          if (res.status == 'Success') {
            this.toastr.success(res.message);
            this.isProceess = false;
            this.subscription = this.whatsappService
              .chatHistory(data.mobileNo)
              .pipe(take(1))
              .subscribe(
                (response) => {
                  this.item = response;
                  this.receivedData = this.item;
                  this.isProceess = false;
                  this.masterName = `/chat-activity/${data.mobileNo}`;
                  this.subscription = this.apiService
                    .getAll(this.masterName)
                    .pipe(take(1))
                    .subscribe(
                      (data) => {
                        this.Userinfo = data;
                        this.nrSelect = this.Userinfo.assignedto;
                        if (this.nrSelect === this.Userinfo?.assignedto) {
                          const foundItem = this.aciveUser.find(
                            (item) => item.userId === this.Userinfo?.assignedto
                          );
                          if (foundItem) {
                            this.DefoluteSelect =
                              foundItem.firstName + ' ' + foundItem.lastName;
                          } else {
                            this.DefoluteSelect =
                              this.Userinfo?.firstName +
                              ' ' +
                              this.Userinfo?.lastName;
                          }
                        }
                        this.isProceess = false;
                        this.cd.detectChanges();
                        this.getContactList();
                      },
                      (error) => {
                        this.isProceess = false;
                      }
                    );
                },
                (error) => {
                  this.isProceess = false;
                }
              );
          }
          if (res.status == 'failed') {
            this.toastr.error(res.message);
            this.isProceess = false;
          }
        },
        (error) => {
          this.isProceess = false;
        }
      );
  }

/**
 * The `onimageAdd()` function opens a modal for uploading an image, sends the image as a WhatsApp
 * message, and displays a success or error message.
 */
  onimageAdd() {
    this.isProceess = true;
    this.showupload = false;
    this.showupload1 = false;
    const modalRef = this.modalService.open(ImageUplodComponent, {
      size: 'lg',
    });
    if (modalRef) {
      this.isProceess = false;
    } else {
      this.isProceess = false;
    }

    modalRef.result
      .then((data: any) => {
        if (data) {
          var request = {
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to: this.contactinfo?.phoneNo,
            type: 'image',
            fromId: this.userData?.userId,
            assignedto: this.userData?.userId,
            names: this.contactinfo?.fullName || null,
          };
          let formData = new FormData();
          formData.append('messageEntry', JSON.stringify(request));
          formData.append('file', data.file);
          this.isProceess = true;
          this.subscription = this.whatsappService
            .sendWhatsAppMessage(formData)
            .pipe(take(1))
            .subscribe(
              (response) => {
                let data: any = response;
                this.toastr.success(data.message);
                this.isProceess = false;
                this.showEmojiPicker = false;
                this.scrollToBottom();
                const audio = new Audio(
                  '../../../../../assets/sound/Whatsapp Message - Sent - Sound.mp3'
                );
                audio.play();
              },
              (error) => {
                this.toastr.error(error.error.message);
                this.isProceess = false;
              }
            );
        }
      })
      .catch(() => {});
  }

/**
 * The `onaudioAdd()` function opens a modal to select an audio file, sends the selected file to a
 * WhatsApp service for sending a message, and displays success or error messages accordingly.
 */
  onaudioAdd() {
    this.isProceess = true;
    this.showupload = false;
    this.showupload1 = false;
    const modalRef = this.modalService.open(AudioComponent, {
      size: 'md',
    });
    if (modalRef) {
      this.isProceess = false;
    } else {
      this.isProceess = false;
    }
    modalRef.result
      .then((data: any) => {
        if (data) {
          var request = {
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to: this.contactinfo?.phoneNo,
            type: 'audio',
            fromId: this.userData?.userId,
            assignedto: this.userData?.userId,
            names: this.contactinfo?.fullName || null,
          };
          let formData = new FormData();
          formData.append('messageEntry', JSON.stringify(request));
          formData.append('file', data.file);
          this.isProceess = true;
          this.subscription = this.whatsappService
            .sendWhatsAppMessage(formData)
            .pipe(take(1))
            .subscribe(
              (response) => {
                let data: any = response;
                this.toastr.success(data.message);
                this.isProceess = false;
                this.showEmojiPicker = false;
                this.scrollToBottom();
                const audio = new Audio(
                  '../../../../../assets/sound/Whatsapp Message - Sent - Sound.mp3'
                );
                audio.play();
              },
              (error) => {
                this.toastr.error(error.error.message);
                this.isProceess = false;
              }
            );
        }
      })
      .catch(() => {});
  }

/**
 * The function `ondocumentAdd()` opens a modal to add a document, sends the document to a recipient
 * via WhatsApp, and displays a success message or an error message.
 */
  ondocumentAdd() {
    this.isProceess = true;
    this.showupload = false;
    this.showupload1 = false;
    const modalRef = this.modalService.open(DocumentComponent, {
      size: 'md',
    });
    if (modalRef) {
      this.isProceess = false;
    } else {
      this.isProceess = false;
    }
    modalRef.result
      .then((data: any) => {
        if (data) {
          var request = {
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to: this.contactinfo?.phoneNo,
            type: 'document',
            caption: data.caption,
            fromId: this.userData?.userId,
            assignedto: this.userData?.userId,
            names: this.contactinfo?.fullName || null,
          };
          let formData = new FormData();
          formData.append('messageEntry', JSON.stringify(request));
          formData.append('file', data.file);
          this.isProceess = true;
          this.subscription = this.whatsappService
            .sendWhatsAppMessage(formData)
            .pipe(take(1))
            .subscribe(
              (response) => {
                let data: any = response;
                this.toastr.success(data.message);
                this.isProceess = false;
                this.showEmojiPicker = false;
                this.scrollToBottom();
                const audio = new Audio(
                  '../../../../../assets/sound/Whatsapp Message - Sent - Sound.mp3'
                );
                audio.play();
              },
              (error) => {
                this.toastr.error(error.error.message);
                this.isProceess = false;
              }
            );
        }
      })
      .catch(() => {});
  }
/**
 * The `onvideoAdd()` function opens a modal to add a video, sends the video file and caption to a
 * server, and displays a success message or error message accordingly.
 */

  onvideoAdd() {
    this.isProceess = true;
    this.showupload = false;
    this.showupload1 = false;
    const modalRef = this.modalService.open(VideoComponent, {
      size: 'md',
    });
    if (modalRef) {
      this.isProceess = false;
    } else {
      this.isProceess = false;
    }
    modalRef.result
      .then((data: any) => {
        if (data) {
          var request = {
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to: this.contactinfo?.phoneNo,
            type: 'video',
            caption: data.caption,
            fromId: this.userData?.userId,
            assignedto: this.userData?.userId,
            names: this.contactinfo?.fullName || null,
          };
          let formData = new FormData();
          formData.append('messageEntry', JSON.stringify(request));
          formData.append('file', data.file);
          this.isProceess = true;
          this.subscription = this.whatsappService
            .sendWhatsAppMessage(formData)
            .pipe(take(1))
            .subscribe(
              (response) => {
                let data: any = response;
                this.toastr.success(data.message);
                this.isProceess = false;
                this.showEmojiPicker = false;
                this.scrollToBottom();
                const audio = new Audio(
                  '../../../../../assets/sound/Whatsapp Message - Sent - Sound.mp3'
                );
                audio.play();
              },
              (error) => {
                this.toastr.error(error.error.message);
                this.isProceess = false;
              }
            );
        }
      })
      .catch(() => {});
  }

 /**
  * The function `onLocationAdd()` opens a modal to add location details, and upon receiving the
  * location data, sends a WhatsApp message with the location information.
  */
  onLocationAdd() {
    this.isProceess = true;
    this.showupload = false;
    this.showupload1 = false;
    const modalRef = this.modalService.open(LocationDetailsComponent, {
      size: 'md',
    });
    if (modalRef) {
      this.isProceess = false;
    } else {
      this.isProceess = false;
    }

    modalRef.result
      .then((data: any) => {
        if (data) {
          var request = {
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to: this.contactinfo?.phoneNo,
            type: 'location',
            fromId: this.userData?.userId,
            assignedto: this.userData?.userId,
            names: this.contactinfo?.fullName || null,
            latitude: data.latitude,
            longitude: data.longitude,
            locationAddress: data.address,
            locationName: data.locationName,
          };
          let formData = new FormData();
          formData.append('messageEntry', JSON.stringify(request));
          this.isProceess = true;
          this.subscription = this.whatsappService
            .sendWhatsAppMessage(formData)
            .pipe(take(1))
            .subscribe(
              (response) => {
                let data: any = response;
                this.toastr.success(data.message);
                this.isProceess = false;
                this.showEmojiPicker = false;
                this.scrollToBottom();
                const audio = new Audio(
                  '../../../../../assets/sound/Whatsapp Message - Sent - Sound.mp3'
                );
                audio.play();
              },
              (error) => {
                this.toastr.error(error.error.message);
                this.isProceess = false;
              }
            );
        }
      })
      .catch(() => {});
  }

 /**
  * The function `getTemplates` opens a modal window, allows the user to select a template, and sends a
  * WhatsApp message with the selected template.
  * @param {any} e - The parameter `e` is of type `any`, which means it can accept any type of value.
  * It is used as an argument in the `getTemplates` function.
  */
  getTemplates(e: any) {
    this.isProceess = true;
    this.showupload = false;
    this.showupload1 = false;
    this.showEmojiPicker = false;
    const modalRef = this.modalService.open(TempletsComponent, {
      size: 'lg',
      centered: true,
      backdrop: 'static',
    });
    if (modalRef) {
      this.isProceess = false;
    } else {
      this.isProceess = false;
    }
    var componentInstance = modalRef.componentInstance as TempletsComponent;
    componentInstance.issuesMaster = e;

    modalRef.result
      .then((data: any) => {
        if (data) {
          var request = {
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to: this.contactinfo?.phoneNo,
            type: 'template',
            fromId: this.userData?.userId,
            assignedto: this.userData?.userId,
            fullname: this.contactinfo?.fullName || null,
            templateName: data.templateName,
            templateBody: data.templateBody,
            templateHeader: data.templateHeader,
          };

          let formData = new FormData();
          formData.append('messageEntry', JSON.stringify(request));
          formData.append('file', data.file);
          this.isProceess = true;
          this.subscription = this.whatsappService
            .sendWhatsAppMessage(formData)
            .pipe(take(1))
            .subscribe(
              (response) => {
                let data: any = response;
                this.toastr.success(data.message);
                this.isProceess = false;
                this.showEmojiPicker = false;
                this.scrollToBottom();
                const audio = new Audio(
                  '../../../../../assets/sound/Whatsapp Message - Sent - Sound.mp3'
                );
                audio.play();
              },
              (error) => {
                this.toastr.error(error.error.message);
                this.isProceess = false;
              }
            );
        }
      })
      .catch(() => {});
  }
}
