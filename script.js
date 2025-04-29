// Terminal functionality
const terminal = {
    commands: {
        'ls': () => 'about.txt\nprojects/\ncontact.txt\nskills.txt',
        'cat': {
            'about.txt': 'I am a DevOps Engineer with expertise in automating infrastructure, implementing CI/CD pipelines, and ensuring high availability of services.',
            'contact.txt': 'Email: jilvinthomas@gmail.com\nLinkedIn: [Your LinkedIn]\nGitHub: [Your GitHub]',
            'skills.txt': 'Docker\nKubernetes\nAWS\nTerraform\nAnsible\nJenkins\nGit\nCI/CD\nLinux\nPython\nBash\nPrometheus\nGrafana'
        },
        'help': () => 'Available commands:\nls - List files\ncat [file] - Display file contents\nhelp - Show available commands\nclear - Clear terminal',
        'clear': () => {
            document.querySelector('.terminal-output').innerHTML = '';
            return '';
        }
    },
    
    init() {
        const input = document.querySelector('.terminal-command-input');
        const output = document.querySelector('.terminal-output');
        
        // Add welcome message
        this.addLine('Welcome to my portfolio terminal! Type "help" to see available commands.', 'welcome-message');
        
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const command = input.value.trim();
                this.addLine(command, 'terminal-command');
                this.processCommand(command);
                input.value = '';
            }
        });
    },
    
    processCommand(command) {
        const [cmd, ...args] = command.split(' ');
        let output = '';
        
        if (cmd === 'cat' && args.length > 0) {
            const file = args[0];
            if (this.commands.cat[file]) {
                output = this.commands.cat[file];
            } else {
                output = `cat: ${file}: No such file or directory`;
                this.addLine(output, 'command-error');
                return;
            }
        } else if (this.commands[cmd]) {
            output = typeof this.commands[cmd] === 'function' ? this.commands[cmd]() : this.commands[cmd];
        } else {
            output = `Command not found: ${cmd}. Type "help" for available commands.`;
            this.addLine(output, 'command-error');
            return;
        }
        
        this.addLine(output, 'command-output');
    },
    
    addLine(text, className = '') {
        const output = document.querySelector('.terminal-output');
        const line = document.createElement('div');
        line.className = `terminal-line ${className}`;
        line.innerHTML = text;
        output.appendChild(line);
        output.scrollTop = output.scrollHeight;
    }
};

// Initialize terminal when the page loads
document.addEventListener('DOMContentLoaded', () => {
    terminal.init();
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Form submission handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });

            // Here you would typically send the data to a server
            console.log('Form submitted:', formObject);
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }

    // Add scroll animation
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Terminal-like typing effect
    const terminalCommand = document.querySelector('.terminal-command');
    const commands = [
        'echo "Welcome to my DevOps Portfolio"',
        'ls -la projects/',
        'cat about.txt',
        'tail -f experience.log'
    ];
    let commandIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeCommand() {
        const currentCommand = commands[commandIndex];
        
        if (isDeleting) {
            terminalCommand.textContent = currentCommand.substring(0, charIndex - 1);
            charIndex--;
        } else {
            terminalCommand.textContent = currentCommand.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentCommand.length) {
            isDeleting = true;
            setTimeout(typeCommand, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            commandIndex = (commandIndex + 1) % commands.length;
            setTimeout(typeCommand, 500);
        } else {
            setTimeout(typeCommand, isDeleting ? 50 : 100);
        }
    }

    // Start the typing effect
    typeCommand();
}); 