
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

    private gatheruserInput(): [string, string, number] | undefined{
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputeElement.value;

        if (enteredTitle.trim().length === 0 || enteredDescription.trim().length === 0 || enteredPeople.trim().length === 0){
            alert('Invalid input. please try again');
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
        const userInput = this.gatheruserInput();

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