/*Adding the team members*/
const teamMembers = [
    {
        name: "Jane Davis",
        role: "Senior Lead Developer",
        description: "Jane is our lead developer and the mastermind behind the platform's intuitive design. With a background in computer science and a love for books, she brings both technical expertise and literary passion to the team.",
        photo: "/assets/jane-doe-image.jpg"   
    },
    {
        name: "Will Jameson",
        role: "Senior UX Designer",
        description: "Will is the creative spirit of the team and always brings innovative ideas to the table. With a passion for books and aesthetics, Will has brought immense contributions to the shaping of Booktopia.",
        photo: "/assets/john-doe-image.jpg"
    },
    {
        name: "Denise Miller",
        role: "Content and Community Manager",
        description: "Denise responsible for our content and community engagement. An avid reader and writer, she ensures that our platform is filled with valuable resources and that our community continues to develop and connect.",
        photo: "/assets/jane-doe-image-2.png"
    }
]

/*Defining variables*/
const meetTeamSection = document.getElementById("meet-the-team");
const memberProfile = document.createElement("div");
memberProfile.classList.add("member-profile");

function displayTeamMembers(members) {
    members.forEach(member => {
        const profilePicture = document.createElement("img");
        profilePicture.src = member.photo;
        profilePicture.alt = "Team Member's Photo";

        const name = document.createElement("h3");
        name.textContent = `${member.name}`;

        const role = document.createElement("h3");
        role.textContent = `${member.role}`;

        const description = document.createElement("p");
        description.textContent = `${member.description}`;

        memberProfile.appendChild(profilePicture);
        memberProfile.appendChild(name);
        memberProfile.appendChild(role);
        memberProfile.appendChild(description);

        meetTeamSection.appendChild(memberProfile);
});
};

displayTeamMembers(teamMembers);