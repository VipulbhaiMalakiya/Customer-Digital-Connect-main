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
import { Location } from '@angular/common';
import * as $ from 'jquery';
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
  isProceess: boolean = true;
  firstname: any;
  lastname: any;
  userData: any;
  userMessage = [];
  chatname: any;
  label: any;
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
  DefoluteSelect: any;
  @ViewChild('chatContainer', { static: false }) chatContainer!: ElementRef;
  // Emoji Code Start
  message = '';
  showEmojiPicker = false;
  showupload = false;
  toggleEmojiPicker() {
    this.showupload = false;
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
    // console.log('focus');
    this.showEmojiPicker = false;
  }
  onBlur() {
    // console.log('onblur');
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
    private cd: ChangeDetectorRef
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

  public connect(): void {
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = webSocket(environment.SOCKET_ENDPOINT);
      this.socket$.subscribe((data: MessageData) => {
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
          const audio = new Audio(
            '../assets/sound/Google Chat - Notification Tone.mp3'
          );
          audio.play();
        }
      });
    }
  }

  toggleupload() {
    this.showEmojiPicker = false;
    this.showupload = !this.showupload;
  }
  // Download code start

  downloadFile(e: any) {
    const link = document.createElement('a');
    link.setAttribute('href', e.fileUrl);
    link.setAttribute('download', e.filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  // Download code end
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

  isOverflowing(el: any) {
    return el.offsetWidth < el.scrollWidth;
  }
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

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  getShortName(fullName?: any) {
    return fullName.charAt(0);
    // return fullName?.split(' ').map((n: any[]) => n[0]).join('');
  }

  scrollToBottom(): void {
    try {
      const chatContainerEl = this.chatContainer.nativeElement;
      chatContainerEl.scrollTop = chatContainerEl.scrollHeight;
    } catch (err) {}
  }

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

  onViewContact(e: any, c: any) {
    this.contactinfo = e;
    this.bgclass = c;
    this.contactId = e.id;
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

  onlabelRemove(e: any) {
    this.label = '';
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
    componentInstance.message = 'Are you sure you want to remove tegs?';
    modalRef.result
      .then((canDelete: boolean) => {
        if (canDelete) {
          this.masterName = `/customer/label-remove/${this.contact}`;
          // this.isProceess = true;
          this.subscription = this.apiService
            .deleteID(this.masterName)
            .pipe(take(1))
            .subscribe(
              (res) => {
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
          },
          (error) => {
            this.toastr.error(error.error.message);
            this.isProceess = false;
            form.reset();
          }
        );
    }
  }

  quickReply() {
    this.isProceess = true;
    this.showupload = false;
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
    modalRef.result.then((data: any) => {
      this.message = data;
    }).catch(() => {});
  }
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
          },
          (error) => {
            this.toastr.error(error.error.message);
            this.isProceess = false;
            form.reset();
          }
        );
    }
  }

  ngOnDestroy() {
    // this.socket$.complete();
    this.subscription?.unsubscribe();
  }
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

  onimageAdd() {
    this.isProceess = true;
    this.showupload = false;
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

  onaudioAdd() {
    this.isProceess = true;
    this.showupload = false;
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

  ondocumentAdd() {
    this.isProceess = true;
    this.showupload = false;
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

  onvideoAdd() {
    this.isProceess = true;
    this.showupload = false;
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

  onLocationAdd() {
    this.isProceess = true;
    this.showupload = false;
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
  getTemplates(){
    this.isProceess = true;
    this.showupload = false;
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
  }
}
