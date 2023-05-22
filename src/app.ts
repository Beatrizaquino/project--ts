
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

    @autobind
    private submitHanlder(event: Event) {
        event.preventDefault();
        console.log(this.titleInputElement.value);

    }

    private configure() {
        this.element.addEventListener('submit', this.submitHanlder.bind(this));
    }

    private attach() {
        this.hostElement?.insertAdjacentElement('afterbegin', this.element );
    }
}

const prjInput =  new ProjectInput();