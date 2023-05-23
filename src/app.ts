
//validation
interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}

function validate(validatableInput: Validatable){
    let isvalid = true;
    if ( validatableInput.required) {
        isvalid = isvalid && validatableInput.value.toString().trim().length !== 0;
    }
    if (validatableInput.minLength != null && typeof validatableInput.value === 'string') {
        isvalid = isvalid && validatableInput.value.length >= validatableInput.minLength;
    }
    if (validatableInput.maxLength != null && typeof validatableInput.value === 'string') {
        isvalid = isvalid && validatableInput.value.length <= validatableInput.maxLength;
    }
    if (validatableInput.min != null && typeof validatableInput.value === 'number') {
        isvalid = isvalid && validatableInput.value >= validatableInput.min;
    }
    if (validatableInput.max != null && typeof validatableInput.value === 'number') {
        isvalid = isvalid && validatableInput.value <= validatableInput.max;
    }
    return isvalid;
}


//autobind decorator
function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {

    const originalMathod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMathod.bind(this);
            return boundFn;
        }
    };
    return adjDescriptor;
}


//project input class
class ProjectInput  {

    templateElement: HTMLTemplateElement ;
    hostElement: HTMLDivElement ;
    element: HTMLFormElement ;
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputeElement: HTMLInputElement;

    constructor() {
        this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
        this.hostElement = document.getElementById('app')! as HTMLDivElement;

        const importNode = document.importNode(this.templateElement.content, true);
        this.element = importNode.firstElementChild as HTMLFormElement;
        this.element.id = 'user-input';

        this.titleInputElement = this.element.querySelector('#title')! as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector('#description')! as HTMLInputElement;
        this.peopleInputeElement = this.element.querySelector('#people')! as HTMLInputElement;

        this.configure();
        this.attach();
    }

    private gatherUserInput(): [string, string, number] | undefined{
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputeElement.value;

        const titleValidatable: Validatable = {
            value: enteredTitle,
            required: true
        };
        const descriptionValidatable: Validatable = {
            value: enteredDescription,
            required: true,
            minLength: 5,
        };
        const peopleValidatable: Validatable = {
            value: +enteredPeople,
            required: true,
            min: 1
        };

        if (
            !validate(titleValidatable) ||
            !validate(descriptionValidatable) ||
            !validate(peopleValidatable) 
        ){
            alert('Invalid input, please try again');
            return;
        } else {
            return [enteredTitle,enteredDescription, +enteredPeople];
        }
    }

    private clearInputs(){
        this.titleInputElement.value = ' ';
        this.descriptionInputElement.value = ' ';
        this.peopleInputeElement.value = ' ';
    }

    @autobind
    private submitHanlder(event: Event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();

        if(Array.isArray(userInput)){
            const [ title, desc, people] = userInput;
            console.log(title,desc,people);
            this.clearInputs();
        }
    }

    private configure() {
        this.element.addEventListener('submit', this.submitHanlder.bind(this));
    }

    private attach() {
        this.hostElement?.insertAdjacentElement('afterbegin', this.element );
    }
}

const prjInput =  new ProjectInput();