import {
  Component,
  OnDestroy,
  AfterViewInit,
  EventEmitter,
  Input,
  Output,
  forwardRef,
} from '@angular/core';

declare var tinymce: any;

const contentAccessor = {
  useExisting: forwardRef(() => SimpleTinyComponent),
  multi: true
};

@Component({
  selector: 'simple-tiny',
  template: `<textarea id="{{elementId}}"></textarea>`
})

export class SimpleTinyComponent implements AfterViewInit, OnDestroy {
  @Input() elementId: String;
  @Output() onEditorKeyup = new EventEmitter<any>();

  editor;

  ngAfterViewInit() {
    tinymce.baseURL = "../assets/";
    tinymce.init({
      selector: '#' + this.elementId,
      plugins: ['link', 'paste', 'table', 'image'],
      skin_url: '../assets/skins/lightgray',
      height: "400",
      file_browser_callback: function(field_name, url, type, win) {
            if(type=='image') document.getElementById('image-upload').click();
        },
      setup: editor => {
        this.editor = editor;
        editor.on('keyup', () => {
          const content = editor.getContent();
          this.onEditorKeyup.emit(content);
        });
      },
    });
  }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }
}
