import {
    Component,
    Input,
    OnInit,
    Output,
    EventEmitter,
    ViewChild
} from '@angular/core';
import { HashService } from '../utils/hash.service';
import { Placement, PopperOptions } from 'popper.js';
import { PopoverDirective } from './popover-directive/popover.directive';

/**
 * The popover is a wrapping component that accepts a *control* as well as a *body*.
 * The control is what will trigger the opening of the actual popover, which is called the body.
 * By default, popovers are triggered by click. This can be customized through the *triggers* input.
 * PopoverComponent is an abstraction of PopoverDirective.
 */
@Component({
    selector: 'fd-popover',
    templateUrl: './popover.component.html',
    styleUrls: ['./popover.component.scss']
})
export class PopoverComponent implements OnInit {

    /** @hidden */
    @ViewChild(PopoverDirective)
    directiveRef: PopoverDirective;

    /** Whether the popover should have an arrow. */
    @Input()
    arrow: boolean = false;

    /** Whether the popover is disabled. */
    @Input()
    disabled: boolean = false;

    /** Whether the popover should be treated as a dropdown. */
    @Input()
    isDropdown: boolean = false;

    /** The element to which the popover should be appended. */
    @Input()
    appendTo: HTMLElement | 'body';

    /** The trigger events that will open/close the popover.
     *  Accepts any [HTML DOM Events](https://www.w3schools.com/jsref/dom_obj_event.asp). */
    @Input()
    triggers: string[] = ['click'];

    /** The placement of the popover. It can be one of: top, top-start, top-end, bottom,
     *  bottom-start, bottom-end, right, right-start, right-end, left, left-start, left-end. */
    @Input()
    placement: Placement;

    /** Only to be used when the popover is used as a dropdown. The glyph to display. */
    @Input()
    glyph: string;

    /** Only to be used when the popover is used as a dropdown. The btnType to display. */
    @Input()
    btnType: string = '';

    /** Whether the popover is open. Can be used through two-way binding. */
    @Input()
    isOpen: boolean = false;

    /** Only to be used when the popover is used as a dropdown. Whether the dropdown is in compact format. */
    @Input()
    compact: boolean = false;

    /** Only to be used when the popover is used as a dropdown. Whether the dropdown is in a toolbar. */
    @Input()
    toolbar: boolean = false;

    /** The Popper.js options to attach to this popover.
     * See the [Popper.js Documentation](https://popper.js.org/popper-documentation.html) for details. */
    @Input()
    options: PopperOptions = {
        placement: 'bottom-start',
        modifiers: {
            preventOverflow: {
                enabled: true,
                escapeWithReference: true,
                boundariesElement: 'scrollParent'
            }
        }
    };

    /** Whether the popover should be focusTrapped. */
    @Input()
    focusTrapped: boolean = false;

    /** Whether the Popover Body should try to have the same width as the Popover Control. */
    @Input()
    fillControl: boolean = false;

    /** Whether the popover should close when a click is made outside its boundaries. */
    @Input()
    closeOnOutsideClick: boolean = true;

    /** Whether the popover should close when the escape key is pressed. */
    @Input()
    closeOnEscapeKey: boolean = true;

    /** Event emitted when the state of the isOpen property changes. */
    @Output()
    isOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    /** @hidden */
    id: string;

    /** @hidden */
    constructor(private hasher: HashService) {}

    /** @hidden */
    ngOnInit(): void {
        this.id = this.hasher.hash();
    }

    /**
     * Toggles the popover open state.
     */
    public toggle(): void {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    /**
     * Closes the popover.
     */
    public close(): void {
        if (this.isOpen) {
            this.isOpen = false;
            this.isOpenChange.emit(this.isOpen);
        }
    }

    /**
     * Opens the popover.
     */
    public open(): void {
        if (!this.isOpen) {
            this.isOpen = true;
            this.isOpenChange.emit(this.isOpen);
        }
    }

    /**
     * Forces an update of the popover's positioning calculation.
     */
    public updatePopover(): void {
        this.directiveRef.updatePopper();
    }

}
