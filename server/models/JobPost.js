class JobPost {
    constructor({ id = null, title, companyName, payRange, workLocation, description }) {
        this.id = id;
        this.title = title;
        this.companyName = companyName;
        this.payRange = payRange;
        this.workLocation = workLocation;
        this.description = description;
    }
}

export default JobPost;