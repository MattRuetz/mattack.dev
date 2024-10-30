<script lang="ts">
    let { heading, subheading, color, icon, href } = $props<{
        heading: string;
        subheading: string;
        color: string;
        icon: string;
        href: string;
    }>();

    let contentElement: HTMLDivElement;
    let isHovering = false;
    
    function handleMouseMove(event: MouseEvent) {
        if (!contentElement || !isHovering) return;
        
        const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        // Calculate movement (reduced to subtle movement - adjust multiplier as needed)
        const moveX = (x - rect.width / 2) * 0.1;
        const moveY = (y - rect.height / 2) * 0.1;
        
        contentElement.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
    
    function handleMouseEnter() {
        isHovering = true;
    }
    
    function handleMouseLeave() {
        isHovering = false;
        if (contentElement) {
            contentElement.style.transform = 'translate(0, 0)';
        }
    }
    
</script>

<a 
    {href} 
    class="card text-[var(--base)] rounded-lg p-8 shadow-sm border-2 min-h-[200px]" 
    style:border-color="var(--{color})"
    style:--card-bg-color="var(--{color})"
    onmousemove={handleMouseMove}
    onmouseenter={handleMouseEnter}
    onmouseleave={handleMouseLeave}
>
    <div 
        class="content flex flex-col w-full h-full"
        bind:this={contentElement}
    >
        <h2 class="text-4xl font-bold text-[var(--{color})]">{heading}</h2>
        <p class="text-[var(--subtext0)]">{subheading}</p>
    </div>
    <i class="fa-solid fa-{icon} text-[100px] absolute bottom-5 right-5 text-[var(--{color})] opacity-10"></i>
</a>

<style>
    * {
        transition: all 0.3s ease;
    }

	.card {
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

    .card:hover h2,
    .card:hover p,
    .card:hover i {
        color: var(--base);
        opacity: 1;
    }

	.card:hover {
		transform: translateY(-5px);
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        background-color: var(--card-bg-color);
	}

	.card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		opacity: 0;
	}

	.card:hover::before {
		opacity: 1;
	}

    .content {
        transition: transform 0.2s ease-out;
    }
</style>
