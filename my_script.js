const logo = document.getElementById("logo");
const loadingBarContainer = document.getElementById("loading-bar-container");
const loadingBar = document.getElementById("loading-bar");
const card = document.getElementById("card");
const enterBtn = document.getElementById("enter-btn");
const heading = document.getElementById("heading-container"); 
const bodyText = document.getElementById("body-text-container");
const photosOverlay = document.getElementById("photosOverlay");



    const tl = gsap.timeline();

// Step 1: Logo slides up to center
tl.to(logo, {
  bottom: "50%",
  duration: 1,
  ease: "power3.out",
  transform: "translateX(-50%)"
});

    // Step 2: Fade in loading bar container (after delay)
    tl.to(loadingBarContainer, {
      opacity: 1,
      duration: 0.1
    }, "+=1.2");

    // Step 3: Fill loading bar
    tl.to(loadingBar, {
      width: "100%",
      duration: 2.5,
      ease: "power1.inOut"
    });

    // Step 4: Hide loading bar
    tl.to(loadingBarContainer, {
      opacity: 0,
      duration: 0.2
    });

    // Step 4.5: Fade in background image
    tl.to("body::before", {
      opacity: 1,
      duration: 1.5,
      ease: "power2.inOut",
      onStart: () => {
        document.body.classList.add("show-bg");
      }
    });

// Step 5: Move logo to top, scale down
tl.to(logo, {
  bottom: "80%",
  duration: 0.6,
  ease: "power2.out",
  transform: "translateX(-50%) scale(0.6)"
}, "-=0.3");

    // Step 6: Slide up card & fade in (includes Enter button)
    tl.to(card, {
      top: "28%",
      opacity: 1,
      duration: 0.8,
      ease: "power2.out",
      onStart: () => {
        enterBtn.style.opacity = "1";
      },
      onComplete: () => {
        card.classList.add('with-shadow');
      }
    }, "-=0.6");

    // Add click event to "Sign In" button
    enterBtn.addEventListener("click", () => {
      showMainUI();
      gsap.set("#topHeader", { y: -20, opacity: 0 });
      gsap.set("#dock", { y: 0 });
        const headingContainer = document.getElementById("heading-container");

// After the logo and heading animations
const signInTl = gsap.timeline();

// Step 1: Fade out the card
signInTl.to(card, {
  opacity: 0,
  duration: 0.2,
  ease: "power2.inOut",
  onComplete: () => card.style.display = "none"
});

// Step 2: Delay before starting the next animations
signInTl.to({}, { duration: 0.3 }); // 0.3s delay

// Step 3: Animate logo
signInTl.to(logo, {
  bottom: "70%",
  scale: 0.9,
  duration: 0.5,
  ease: "power2.out"
});

// Step 4: Animate heading container (at the same time as logo)
signInTl.to(headingContainer, {
  opacity: 1,
  y: -20,
  duration: 0.5,
  ease: "power2.out"
}, "<"); // "<" makes it run simultaneously with the logo animation

// Step 5: Shorter delay before animating the body text (0.2 seconds)
signInTl.to("#body-text-container", {
  opacity: 1,
  y: -20,
  duration: 0.3,
  ease: "power2.out"
}, "+=0.1"); // This starts 0.2 seconds after the heading animation

// Step 6: Animate dock into view
signInTl.to("#dock", {
  opacity: 1,
  y: -20,
  duration: 0.35,
  ease: "back.out(1.7)" // ✨ bounce effect!
}, "-=0.25");

// After dock fades in, allow clicking
signInTl.set("#dock", {
  pointerEvents: "auto"
});

signInTl.to("#topHeader", {
  y: 0,
  opacity: 1,
  duration: 0.35, // a little slower to let bounce happen
  ease: "back.out(1.7)" // ✨ bounce effect
}, "-=0.2");

signInTl.set(["#heading-container", "#body-text-container", "#logo", "#topHeader"], {
  pointerEvents: "auto",
  userSelect: "auto"
});


});

const dockIcons = document.querySelectorAll('.dock-icon');

dockIcons.forEach((icon, index) => {
  icon.addEventListener('mouseenter', () => {
    dockIcons.forEach((el, i) => {
      el.style.transform = 'translateY(0) scale(1)';
    });

    icon.style.transform = 'translateY(-10px) scale(1.3)';

    // Lift the previous icon if it exists
    if (dockIcons[index - 1]) {
      dockIcons[index - 1].style.transform = 'translateY(-5px) scale(1.1)';
    }

    // Lift the next icon if it exists
    if (dockIcons[index + 1]) {
      dockIcons[index + 1].style.transform = 'translateY(-5px) scale(1.1)';
    }
  });

  icon.addEventListener('mouseleave', () => {
    dockIcons.forEach((el) => {
      el.style.transform = 'translateY(0) scale(1)';
    });
  });
});

document.getElementById("photosIcon").addEventListener("click", () => {
  const isOverlayVisible = photosOverlay.style.display === "flex";

  if (isOverlayVisible) {
    animatePhotosOverlay(false);

        // Remove active class from photosIcon when closing
        photosIcon.classList.remove('active');

    // Show hero content again after delay
    setTimeout(() => {
      [logo, heading, bodyText].forEach(el => {
        el.style.display = 'block';
        el.classList.add('fade-in');
        void el.offsetWidth;
        el.classList.add('show');
        setTimeout(() => {
          el.classList.remove('fade-in', 'show');
        }, 300);
      });
    }, 200);

  } else {
    // Hide all other windows
    document.querySelectorAll('.window').forEach(win => {
      win.classList.remove('active');
      win.style.visibility = 'hidden';
      win.style.display = 'none';
      gsap.set(win, { clearProps: 'all' });
    });

        // Clear all dock icons first
        document.querySelectorAll('.dock-icon').forEach(dock => {
      dock.classList.remove('active');
    });

    // Hide hero content
    [logo, heading, bodyText].forEach(el => el.style.display = 'none');

    animatePhotosOverlay(true);

        // Add active class to photosIcon when opening
        photosIcon.classList.add('active');
  }
});


document.getElementById("closePhotosOverlay").addEventListener("click", () => {
  animatePhotosOverlay(false);

   // 🛠 REMOVE the active dot too
   photosIcon.classList.remove('active');

  // Show hero content again after delay
  setTimeout(() => {
    [logo, heading, bodyText].forEach(el => {
      el.style.display = 'block';
      el.classList.add('fade-in');
      void el.offsetWidth;
      el.classList.add('show');
      setTimeout(() => {
        el.classList.remove('fade-in', 'show');
      }, 300);
    });
  }, 200);
});


mainVideo.addEventListener('canplay', () => {
  mainVideo.play().catch(err => {
    console.log("Autoplay failed:", err);
  });
});


function animateWindowToIcon(windowEl, iconEl, direction = "in", onCloseDone = null) {
  const iconRect = iconEl.getBoundingClientRect();
  const iconCenterX = iconRect.left + iconRect.width / 2;
  const iconCenterY = iconRect.top + iconRect.height / 2;

  // 👇 Raise the animation origin ABOVE the icon (tweak -30 as needed)
  const liftOffset = 200;
  const anchorY = iconCenterY - liftOffset;

  const screenCenterX = window.innerWidth / 2;
  const screenCenterY = window.innerHeight / 2;

  const offsetX = iconCenterX - screenCenterX;
  const offsetY = anchorY - screenCenterY;

  if (direction === "in") {
  const liftOffset = 100;
  const anchorY = iconCenterY - liftOffset;

  const offsetX = iconCenterX - screenCenterX;
  const offsetY = anchorY - screenCenterY;

  iconEl.dataset.offsetX = offsetX;
  iconEl.dataset.offsetY = offsetY;

  gsap.set(windowEl, {
    x: offsetX,
    y: offsetY - 100,
    scaleX: 0.1,
    scaleY: 0.8,
    transformOrigin: 'center center'
  });

  gsap.to(windowEl, {
    duration: 0.2,
    x: 0,
    y: -50,
    scaleX: 1,
    scaleY: 1,
    opacity: 1,
    ease: "power2.out",
    onStart: () => {
      windowEl.classList.add('active');
      windowEl.style.display = 'flex';
      windowEl.style.visibility = 'visible';
    }
  });


} else {
  const returnX = parseFloat(iconEl.dataset.offsetX || 0);
  const returnY = parseFloat(iconEl.dataset.offsetY || 0) - 30;

  const tl = gsap.timeline({
    onComplete: () => {
      windowEl.style.visibility = 'hidden';
      windowEl.style.display = 'none';
      windowEl.classList.remove('active');
      gsap.set(windowEl, { clearProps: "all" });
    }
  });

  // Shrink and float up — no opacity fade
  tl.to(windowEl, {
    duration: 0.2,
    scaleX: 0.02,
    scaleY: 0.15,
    x: returnX,
    y: returnY,
    ease: "power2.in"
  });
}
}

dockIcons.forEach(icon => {
  icon.addEventListener('click', () => {
    const windowId = icon.getAttribute('data-window-id');

    if (!windowId) return; // Don't proceed unless this is a window-type icon

    const selectedWindow = document.getElementById(windowId);
    const isOpen = selectedWindow.classList.contains('active');

    // 🔒 Close photosOverlay if it's visible and we're opening a new window
    if (!isOpen && photosOverlay.style.display === 'flex') {
      animatePhotosOverlay(false);
      document.getElementById("photosIcon").classList.remove('active'); // Remove dot from photos
    }

    if (isOpen) {
      // 🔁 Close with reverse animation
      animateWindowToIcon(selectedWindow, icon, "out");

      // Remove the dot when closing
      icon.classList.remove('active');

      // Show hero elements again
      setTimeout(() => {
        [logo, heading, bodyText].forEach(el => {
          el.style.display = 'block';
          el.classList.add('fade-in');
          void el.offsetWidth;
          el.classList.add('show');
          setTimeout(() => {
            el.classList.remove('fade-in', 'show');
          }, 300);
        });
      }, 200);

    } else {
      // 🧹 Close all other windows
      document.querySelectorAll('.window').forEach(win => {
        win.classList.remove('active');
        win.style.visibility = 'hidden';
        win.style.display = 'none';
        gsap.set(win, { clearProps: 'all' });
      });

      // Clear all active dots first
      document.querySelectorAll('.dock-icon').forEach(dock => {
        dock.classList.remove('active');
      });

      // Hide hero elements
      [logo, heading, bodyText].forEach(el => {
        el.style.display = 'none';
      });

      // 🪄 Open with animation from icon
      animateWindowToIcon(selectedWindow, icon, "in");

      // Add the active dot
      icon.classList.add('active');
    }
  });
});




function changeContent(windowId, contentKey) {
  const contentMap = {
    'window-1': {
      content1: `
      <div class="header-wrapper">
        <div class="logo-container" style="background-color: #939393;">
          <img src="search (1).webp" alt="Logo" class="logo" />
        </div>
        <div class="heading-container">
          <h2>Background of the Study</h2>
        </div>
      </div>
      <div class="content-body">
        <p style="text-indent: 2em;">Western Mindanao Adventist Academy (WMAA), like many educational institutions, is undergoing a phase where modernization and sustainability are key priorities for future development. Educational facilities play a crucial role in shaping the learning environment, which in turn influence the academic and social outcomes of students. Thus, ensuring that these facilities are well-maintained, efficiently designed, and aligned with both contemporary educational needs and global sustainability efforts is of paramount importance.</p>
<br>
<strong>Western Mindanao Adventist Academy (WMAA)</strong><br>
<p style="text-indent: 2em;">Western Mindanao Adventist Academy (WMAA) is a secondary boarding school located in Dumingag, Zamboanga del Sur, with an annex campus in Ozamiz City, Misamis Occidental. It operates under the global Seventh-day Adventist educational system and is affiliated with several educational organizations, including FAPE and the Adventist Accreditation Agency. The academy offers both junior and senior high school programs, providing academic tracks like STEM, ABM, and HUMMS under the K-12 curriculum. For the school year 2020-2021, WMAA had a total of 760 students—457 in junior high school and 303 in senior high school. It is staffed by 36 employees, including 25 licensed teachers, with several holding master's and doctorate degrees. The academy is recognized for its achievements in various fields, both locally and nationally (Bulahan & Maquilava, 2021).</p>
<br>
<strong>Establishment and Developments</strong><br>
<p style="text-indent: 2em;">The Adventist Church began its denominational school system in the 1870s, with its work in the Philippines starting through Abraham La Rue’s literature ministry. In 1906, Elder J. L. McElhany and Elder L. V. Finster led evangelistic efforts, establishing the first Adventist church in Manila in 1911. The Philippine Mission was formed in 1906 to spread Adventism nationwide. In Mindanao, Dr. Ulysses Charles Fattebert and his wife pioneered the faith through medical work, forming the first Adventist congregation there. By 1958, the mission’s headquarters was established in Ozamiz City, becoming the largest Adventist conference in the Philippines (Bulahan & Maquilava, 2021).</p>
<br>
<strong>History and Foundation</strong><br>
<p style="text-indent: 2em;">Western Mindanao Adventist Academy (WMAA) began in 1962 as a day school in Dumingag, Zamboanga del Sur, established by the Western Mindanao Mission (WMM) under Pastor Bayani Arit’s leadership. Initially named Western Mindanao Junior Academy, it grew from a small school with a one-hectare lot and a few classrooms. The school provided Adventist education, emphasizing spiritual, mental, physical, and social development. In 1968, it became Western Mindanao Academy and held its first graduation in 1969. The school expanded, adding more classrooms, a dormitory, and other facilities. By 1972, it was fully recognized by the Philippine Department of Education. In 1974, it transitioned into a boarding academy (Bulahan & Maquilava, 2021). </p>
They also stated that the Western Mindanao Adventist Academy (WMAA) continued to grow, with significant infrastructure developments over the years, including administration buildings, dormitories, and recreational facilities. In 2013, the school celebrated its 50th anniversary and adopted its current name, Western Mindanao Adventist Academy. With the adoption of the K-12 curriculum, WMAA expanded further, including the establishment of an annex in Ozamiz City in 2019. Despite challenges, including the COVID-19 pandemic, WMAA maintained operations and developed new facilities. As of 2021, WMAA has produced 3,685 graduates, continuing its mission of providing quality Adventist education.</p>
<br>
<strong>Western Mindanao Adventist Academy Contribution</strong><br>
<p style="text-indent: 2em;">They articulate that for over 56 years, Western Mindanao Adventist Academy (WMAA) has excelled in developing spiritually inclined, globally competent leaders. The academy is not just a place for education but also a spiritual hub for the Western Mindanao Conference, hosting conventions, training, and fellowship activities. WMAA plays a vital role in shaping leaders for the church across the Philippines. Its mission is to provide holistic Adventist education for 21st-century learners, aiming to produce Christ-centered, globally competent graduates. The academy offers various extracurricular activities, including sports, music, and clubs focused on academics and values. Students are assured a quality education, emphasizing spirituality, intellectual and physical growth, and strong relationships. WMAA integrates the Adventist Church’s mission to preach the gospel through its spiritual master plan, which includes worship services, devotionals, evangelistic programs, and community outreach initiatives such as the "Feed Our Community" program. 
</p>
      </div>
    `,
    content2: `
  <div class="header-wrapper">
    <div class="logo-container" style="background-color: #007AFF;">
      <img src="question (1).webp" alt="Logo" class="logo" />
    </div>
    <div class="heading-container">
      <h2>Statement of the Problem</h2>
    </div>
  </div>
  <div class="content-body">
    <p style="text-indent: 2em;">
      Western Mindanao Adventist Academy (WMAA) faces a critical need to modernize its facilities and adopt sustainable practices to enhance the learning environment for its students and staff. Despite its commitment to providing quality education, the academy’s infrastructure may be outdated, inefficient, and unable to meet the evolving demands of a modern learning environment. More specifically, this study sought to answer the following questions:
    </p>
    <div class="bullets-container">
    <div class="question-container">
      <p>How can the development of WMAA create a healthy and sustainable learning environment for students and staff?</p>
    </div>
    <div class="question-container">
      <p>What are the specific modernization needs of WMAA’s facilities to support current educational standards?</p>
    </div>
    <div class="question-container no-border">
      <p>How do the architectural needs and experiences of students, staff, and local stakeholders influence the development plan for WMAA?</p>
    </div>
    </div>
  </div>
`,

    content3: `
      <div class="header-wrapper">
        <div class="logo-container" style="background-color: #007AFF;">
          <img src="target (1).webp" alt="Logo" class="logo" />
        </div>
        <div class="heading-container">
          <h2>Objectives of the Study</h2>
        </div>
      </div>
        <div class="content-body">
    <p style="text-indent: 2em;">
      The objective of this study is to develop a comprehensive development plan for Western Mindanao Adventist Academy that modernizes its facilities, aligns with community needs, and incorporates sustainable development goals to enhance the learning environment for students and staff.
    </p>
    <div class="bullets-container">
    <div class="question-container">
      <p>To identify the existing conditions of the facilities in the development of  WMAA.</p>
    </div>
    <div class="question-container">
      <p>To evaluate the architectural needs and experiences of the community, including students, staff, and local stakeholders, to the development of the academy.</p>
    </div>
    <div class="question-container no-border">
      <p>To integrate sustainable development into the development plan, focusing on improving energy efficiency, resource management, and creating a healthy learning environment.</p>
    </div>
    </div>
  </div>
    `,

    content4: `
      <div class="header-wrapper">
        <div class="logo-container" style="background-color: #6FCAD9;">
          <img src="star (2).webp" alt="Logo" class="logo" />
        </div>
        <div class="heading-container">
          <h2>Significance of the Study</h2>
        </div>
      </div>
      <div class="content-body">
        <p style="text-indent: 2em;">
        This study holds significant value for multiple stakeholders and the broader educational community by addressing key areas of facility development and sustainability at Western Mindanao Adventist Academy (WMAA). Moreover, it will specifically benefits the following:</p>
<br>
        <p style="text-indent: 2em;"><strong>Students</strong>. A modernized and sustainably designed campus would provide students with a more conducive and comfortable learning environment. Improved facilities, such as updated classrooms, laboratories, and recreational areas, would also enhance their academic and extracurricular experiences.</p>
<br>
        <p style="text-indent: 2em;"><strong>Teachers</strong>. Teachers at WMAA would benefit from this study since enhanced facilities and resources would empower educators to adopt innovative teaching strategies and foster greater student engagement in their learning processes. Additionally, professional development opportunities that align with the new facilities would also refine their teaching skills, ultimately resulting in improved student performance.</p>
<br>
        <p style="text-indent: 2em;"><strong>Staff</strong>. They would benefit as they would have a more efficient and functional workspace. Updated facilities will improve their productivity and job satisfaction. Additionally, a sustainable campus would contribute to a healthier and more pleasant working environment.</p>
<br>
        <p style="text-indent: 2em;"><strong>Administrators</strong>. This study would help them gain from a more defined framework for strategic planning and resource distribution as the development plan aligns with the needs of the community and sustainable objectives. The organized method would improve decision-making processes and strengthen the overall governance of the academy. Additionally, effectively executing the plan would enhance the academy’s reputation, drawing in more students and resources, which are essential for long-term sustainability.</p>
<br>
        <p style="text-indent: 2em;"><strong>Parents</strong>. They would also benefit as they would be able to recognize the worth of their investment in education through the improved learning environment and outcomes of their children. The upgraded facilities would give them confidence that their children are receiving high-quality education that equips them for future challenges.</p>
<br>
        <p style="text-indent: 2em;"><strong>Future Researchers</strong>. The outcome of the study would derive significant insights of the development plan, which may be utilized as a case study for comparable educational institutions. The results would enrich the wider field of educational development, especially regarding the incorporation of sustainability into school systems. This information may guide the establishment of best practices and innovative approaches that can be adapted in various contexts.
        </p>
      </div>
    `,

    content5: `
      <div class="header-wrapper">
        <div class="logo-container" style="background-color: #939393;">
          <img src="ruler.webp" alt="Logo" class="logo" />
        </div>
        <div class="heading-container">
          <h2>Scope and Limitations</h2>
        </div>
      </div>
      <div class="content-body">
        <p style="text-indent: 2em;">
        This study focused on assessing the existing state of the academy’s facilities, pinpointing specific areas in need of improvement, and providing architectural drawings and conceptualization of structural, mechanical, and electrical systems only. Moreover, this study explored the integration of sustainable development that is directly relevant and necessary for immediate implementation in addressing the current demands of school infrastructure. Thus, the researchers did not focus on exploring the integration of additional sustainable practices that are insignificant to the existing demands. The targeted sustainable practices that the academy integrated based on their current needs include energy efficiency initiatives,  and improving indoor air quality for a healthy learning environment. A comprehensive development plan was created to detail the essential upgrades and enhancements required to ensure the facilities meet educational standards and align with the needs of the community. </p>
<br>
<p style="text-indent: 2em;">The community needs assessment had a small sample size, which could reduce the data’s representativeness. Assessing existing data or plans related to the academy’s facilities could be challenging, particularly if historical maintenance records are unavailable, hindering a comprehensive evaluation. Resource limitations, both financial and human, may restrict the assessment’s scope and the extent of the proposed improvements. The success of the community needs assessment depends on the stakeholder's engagement; low participation could result in overlooking crucial insights that inform the development plan. 
        </p>
      </div>
    `,

    content6: `
      <div class="header-wrapper">
        <div class="logo-container" style="background-color: #17AFF1;">
          <img src="books-stack-of-three.webp" alt="Logo" class="logo" />
        </div>
        <div class="heading-container">
          <h2>Definition of Terms</h2>
        </div>
      </div>
      <div class="content-body">
        <p style="text-indent: 2em;">
        To better understand the study, the following terminologies are specifically defined:</p>
<br><p style="text-indent: 2em;"><strong>Learning Environment</strong>. It's a space where learners feel safe, supported, and inspired by their surroundings to grow and learn.</p>
<br><p style="text-indent: 2em;"><strong>Sustainable Development</strong>. It is a comprehensive strategy outlining the school's goals, objectives, and actions for improving its facilities, aligning with community needs, and incorporating sustainable development practices. Development Plan. It is the process of improving, modernizing, and expanding the academy’s facilities, resources, and programs to enhance the learning environment and meet the needs of students, staff, and the community.</p>
<br><p style="text-indent: 2em;"><strong>Modernization</strong>. It is the process of updating facilities, equipment, and practices to meet current standards and requirements, often involving the use of advanced technology and innovative approaches.</p>
<br><p style="text-indent: 2em;"><strong>Facilities</strong>. These are the physical structures and infrastructure of the school, including classrooms, laboratories, dormitories, administrative buildings, and other essential spaces.</p>
<br><p style="text-indent: 2em;"><strong>Denominational School</strong>.  It is the school’s approach to a religious education system in which character and practices are in line with religious traditions. Existing Conditions. It is the current state of the school facilities, including their age, condition, functionality, and suitability for meeting the needs of students and staff.</p>
<br><p style="text-indent: 2em;"><strong>Ratiocination</strong>. It refers to the systematic approach to analyzing the current state of facilities, assessing community needs, and integrating sustainable practices. 
        </p>
      </div>
    `,
    },

    

    'window-2': {
      content1: `
      <div class="header-wrapper">
        <div class="logo-container" style="background-color: #939393;">
          <img src="search (1).webp" alt="Logo" class="logo" />
        </div>
        <div class="heading-container">
          <h2>Background of the Study</h2>
        </div>
      </div>
      <div class="content-body">
        <p style="text-indent: 2em;">Western Mindanao Adventist Academy (WMAA), like many educational institutions, is undergoing a phase where modernization and sustainability are key priorities for future development. Educational facilities play a crucial role in shaping the learning environment, which in turn influence the academic and social outcomes of students. Thus, ensuring that these facilities are well-maintained, efficiently designed, and aligned with both contemporary educational needs and global sustainability efforts is of paramount importance.</p>
<br>
<strong>Western Mindanao Adventist Academy (WMAA)</strong><br>
<p style="text-indent: 2em;">Western Mindanao Adventist Academy (WMAA) is a secondary boarding school located in Dumingag, Zamboanga del Sur, with an annex campus in Ozamiz City, Misamis Occidental. It operates under the global Seventh-day Adventist educational system and is affiliated with several educational organizations, including FAPE and the Adventist Accreditation Agency. The academy offers both junior and senior high school programs, providing academic tracks like STEM, ABM, and HUMMS under the K-12 curriculum. For the school year 2020-2021, WMAA had a total of 760 students—457 in junior high school and 303 in senior high school. It is staffed by 36 employees, including 25 licensed teachers, with several holding master's and doctorate degrees. The academy is recognized for its achievements in various fields, both locally and nationally (Bulahan & Maquilava, 2021).</p>
<br>
<strong>Establishment and Developments</strong><br>
<p style="text-indent: 2em;">The Adventist Church began its denominational school system in the 1870s, with its work in the Philippines starting through Abraham La Rue’s literature ministry. In 1906, Elder J. L. McElhany and Elder L. V. Finster led evangelistic efforts, establishing the first Adventist church in Manila in 1911. The Philippine Mission was formed in 1906 to spread Adventism nationwide. In Mindanao, Dr. Ulysses Charles Fattebert and his wife pioneered the faith through medical work, forming the first Adventist congregation there. By 1958, the mission’s headquarters was established in Ozamiz City, becoming the largest Adventist conference in the Philippines (Bulahan & Maquilava, 2021).</p>
<br>
<strong>History and Foundation</strong><br>
<p style="text-indent: 2em;">Western Mindanao Adventist Academy (WMAA) began in 1962 as a day school in Dumingag, Zamboanga del Sur, established by the Western Mindanao Mission (WMM) under Pastor Bayani Arit’s leadership. Initially named Western Mindanao Junior Academy, it grew from a small school with a one-hectare lot and a few classrooms. The school provided Adventist education, emphasizing spiritual, mental, physical, and social development. In 1968, it became Western Mindanao Academy and held its first graduation in 1969. The school expanded, adding more classrooms, a dormitory, and other facilities. By 1972, it was fully recognized by the Philippine Department of Education. In 1974, it transitioned into a boarding academy (Bulahan & Maquilava, 2021). </p>
They also stated that the Western Mindanao Adventist Academy (WMAA) continued to grow, with significant infrastructure developments over the years, including administration buildings, dormitories, and recreational facilities. In 2013, the school celebrated its 50th anniversary and adopted its current name, Western Mindanao Adventist Academy. With the adoption of the K-12 curriculum, WMAA expanded further, including the establishment of an annex in Ozamiz City in 2019. Despite challenges, including the COVID-19 pandemic, WMAA maintained operations and developed new facilities. As of 2021, WMAA has produced 3,685 graduates, continuing its mission of providing quality Adventist education.</p>
<br>
<strong>Western Mindanao Adventist Academy Contribution</strong><br>
<p style="text-indent: 2em;">They articulate that for over 56 years, Western Mindanao Adventist Academy (WMAA) has excelled in developing spiritually inclined, globally competent leaders. The academy is not just a place for education but also a spiritual hub for the Western Mindanao Conference, hosting conventions, training, and fellowship activities. WMAA plays a vital role in shaping leaders for the church across the Philippines. Its mission is to provide holistic Adventist education for 21st-century learners, aiming to produce Christ-centered, globally competent graduates. The academy offers various extracurricular activities, including sports, music, and clubs focused on academics and values. Students are assured a quality education, emphasizing spirituality, intellectual and physical growth, and strong relationships. WMAA integrates the Adventist Church’s mission to preach the gospel through its spiritual master plan, which includes worship services, devotionals, evangelistic programs, and community outreach initiatives such as the "Feed Our Community" program. 
</p>
      </div>
    `,
    content2: `
  <div class="header-wrapper">
    <div class="logo-container" style="background-color: #007AFF;">
      <img src="question (1).webp" alt="Logo" class="logo" />
    </div>
    <div class="heading-container">
      <h2>Statement of the Problem</h2>
    </div>
  </div>
  <div class="content-body">
    <p style="text-indent: 2em;">
      Western Mindanao Adventist Academy (WMAA) faces a critical need to modernize its facilities and adopt sustainable practices to enhance the learning environment for its students and staff. Despite its commitment to providing quality education, the academy’s infrastructure may be outdated, inefficient, and unable to meet the evolving demands of a modern learning environment. More specifically, this study sought to answer the following questions:
    </p>
    <div class="bullets-container">
    <div class="question-container">
      <p>How can the development of WMAA create a healthy and sustainable learning environment for students and staff?</p>
    </div>
    <div class="question-container">
      <p>What are the specific modernization needs of WMAA’s facilities to support current educational standards?</p>
    </div>
    <div class="question-container no-border">
      <p>How do the architectural needs and experiences of students, staff, and local stakeholders influence the development plan for WMAA?</p>
    </div>
    </div>
  </div>
`,

    content3: `
      <div class="header-wrapper">
        <div class="logo-container" style="background-color: #007AFF;">
          <img src="target (1).webp" alt="Logo" class="logo" />
        </div>
        <div class="heading-container">
          <h2>Objectives of the Study</h2>
        </div>
      </div>
        <div class="content-body">
    <p style="text-indent: 2em;">
      The objective of this study is to develop a comprehensive development plan for Western Mindanao Adventist Academy that modernizes its facilities, aligns with community needs, and incorporates sustainable development goals to enhance the learning environment for students and staff.
    </p>
    <div class="bullets-container">
    <div class="question-container">
      <p>To identify the existing conditions of the facilities in the development of  WMAA.</p>
    </div>
    <div class="question-container">
      <p>To evaluate the architectural needs and experiences of the community, including students, staff, and local stakeholders, to the development of the academy.</p>
    </div>
    <div class="question-container no-border">
      <p>To integrate sustainable development into the development plan, focusing on improving energy efficiency, resource management, and creating a healthy learning environment.</p>
    </div>
    </div>
  </div>
    `,
    },

    'window-3': {
    content1: `
  <div class="header-wrapper">
    <div class="logo-container" style="background-color: #007AFF;">
      <img src="question (1).webp" alt="Logo" class="logo" />
    </div>
    <div class="heading-container">
      <h2>Data Collection</h2>
    </div>
  </div>
  <div class="content-body">
    <p><strong>Primary Data Collection</strong><br>
    <p style="text-indent: 2em;">Before acquiring the necessary data, the researchers formulated first the questionnaires that were essential for the objectives of the study; a formal letter requesting permission to conduct site observation, interview, and survey to the selected respondents was also prepared.
    </p>
    <div class="bullets-container">
    <div class="question-container">
      <p><strong>Site/Ocular Inspection Data</strong></p>
      <p>Assessing the existing conditions, physical environment, including the classrooms, and facilities in the school is a vital component that would enable the researchers to collect essential data that can further pinpoint potential opportunities and challenges for new development plans of the school and in areas that require enhancement. The researchers used observation checklists to systematically record the condition of classrooms, facilities and the overall environment of the school. Throughout the data gathering phase, the researchers also made documentation in the form of pictures focusing on the condition of the environment and facilities as an illustrative proof of the current state of the school’s physical environment.
      </p>
    </div>
    <div class="question-container">
      <p><strong>Focus Discussion Data</strong></p>
      <p>Interviewing with the school’s administration and faculty to gather insights on their future development plans. By engaging with the community, the researchers sought to align their findings with the school’s aspirations for growth and improvement.
      </p>
    </div>
    <div class="question-container no-border">
      <p><strong>Student and teacher satisfaction survey</strong></p>
      <p">By collecting feedback from these various groups, the researchers sought to gain an understanding of their views on the existing facilities and identify areas for improvement. This thorough assessment guided the academy’s development, ensuring that it addresses the needs of its users and promotes an effective learning environment.
        </p>
    </div>
    </div>

    <br><br>
        <p><strong>Secondary Data Collection </strong><br>
    <p style="text-indent: 2em;">The following data collected were the basis for the planning guidelines of the School of Western Mindanao Adventist Academy (WMAA). This comprehensive framework integrates various essential resources aimed at fostering a conducive environment.
    </p>
    <div class="bullets-container">
    <div class="question-container">
      <p>Campus Planning and Zoning Data</p>
    </div>
    <div class="question-container">
      <p>Comprehensive Land Use Planning</p>
    </div>
    <div class="question-container">
      <p>DepEd and CHED design guidelines</p>
    </div>
    <div class="question-container">
      <p>Online Related Articles</p>
    </div>
    <div class="question-container">
      <p>Fire Code of the Philippines</p>
    </div>
    <div class="question-container">
      <p>National Building Code of the Philippines Revised Version</p>
    </div>
    <div class="question-container">
      <p>Batas Pambansa Bilang 344</p>
    </div>
    <div class="question-container">
      <p>Time-Saver Standards For Building Types</p>
    </div>
    <div class="question-container">
      <p>Metric Handbook - Planning and Design Data</p>
    </div>
    <div class="question-container">
      <p>Sanitation Code of the Philippines</p>
    </div>
    <div class="question-container">
      <p>U.S Department of Education</p>
    </div>
    <div class="question-container no-border">
      <p>Department of Public Works and Highways</p>
    </div>
  </div>
`,

content2: `
  <div class="header-wrapper">
    <div class="logo-container" style="background-color: #007AFF;">
      <img src="question (1).webp" alt="Logo" class="logo" />
    </div>
    <div class="heading-container">
      <h2>Data Analysis</h2>
    </div>
  </div>
  <div class="content-body">
    <p style="text-indent: 2em;">After gathering the data from surveys, interviews, and infrastructure assessments at Western Mindanao Adventist Academy (WMAA), the results were tabulated and evaluated. The researchers used descriptive statistics, and frequency distributions to analyze the Likert scale survey data. A narrative analysis was utilized as well which helped researchers uncover themes and patterns in terms of architectural requirements, such as the need for more collaborative spaces through examining the respondents' shared experiences in the learning environment of the school infrastructure through interview responses. By contrasting the narratives from different groups, the researchers gained insights into diverse perspectives, helping to shape development plans that resonate with the community’s genuine needs and preferences. A software tool such as Excel was also used to streamline the analysis process, offering a thorough understanding of the learning environment as perceived by students, faculty and staff. 
    </p>
    <br>
        <p><strong>Research Respondent </strong><br>
    <p style="text-indent: 2em;">The respondents were basically the students, faculty, staff, and alumni from Western Mindanao Adventist Academy (MWAA). Students, faculty, staff, and alumni at the institution had their own evaluations and preferences regarding the design of their learning environment. 
    </p>
    <p style="text-indent: 2em;">To gather information, stratified sampling was used. Moreover, it involved selecting respondents from three groups: Students of (WMAA), and Faculty of (WMAA), and Staff of (WMAA).
    </p>
    <p><strong>Student of (WMAA)</strong>, the procedures of sampling in gathering data were as follows:</p> 
    </p>
    <div class="bullets-container">
      <div class="question-container">
      <p><strong>Survey </strong></p>
      <p>A sample of 90 students were using purposive sampling <br><strong>Faculty of  (WMAA)</strong>, the procedures of sampling in gathering data are as follows:
      </p>
      <ol>
        <li>Focus Group Discussion - To be conducted with a faculty and Admin member with the knowledge of the present learning environment of their school.</li> 
      </ol>
      </div>
      <div class="question-container no-border">
        <p><strong>Survey </strong></p>
        <p>
          A sample of 5 faculty were selected. <br><strong>Staff of (WMAA)</strong>, the procedures of sampling in gathering data are as follows:
        </p>
        <ol>
          <li>Survey - A sample of 5 staff were selected, regardless of their particular work jobs at the school.</li>
        </ol>

          <table style="margin-top: 1em; border-spacing: 0 5px; width: 100%; text-align: center;">
            <thead style="background-color: #007AFF; color: white; border-radius: 5px;">
            <tr>
              <th style="border-top-left-radius: 5px; border-bottom-left-radius: 5px; padding: 1px;">Group of Respondents</th>
              <th style="padding: 1px;">Total Population</th>
              <th style="border-top-right-radius: 5px; border-bottom-right-radius: 5px; padding: 1px;">Sample Size</th>
            </tr>
            </thead>
            <tbody>
              <tr>
                <td>Grade-11</td>
                <td>621</td>
                <td>30</td>
              </tr>
              <tr>
                <td>Grade-12</td>
                <td>280</td>
                <td>30</td>
              </tr>
              <tr>
                <td>Grade-10</td>
                <td>89</td>
                <td>30</td>
              </tr>
              <tr>
                <td>Faculty & Staff</td>
                <td>42</td>
                <td>10</td>
              </tr>
              <tr style="font-weight: bold;">
                <td>Total</td>
                <td>1032</td>
                <td>100</td>
              </tr>
            </tbody>
          </table>

      </div>

    </div>

    <br><br>
        <p><strong>Research Tools/Instruments</strong><br>
    <p style="text-indent: 2em;">Google earth, camera for photo capturing, and basic drawing tools for sketching were used as instruments for inspections or observations. Furthermore, the use of checklists was recommended for natural observations, which involve describing the learning environment, particularly the site and facilities without attempting to influence behavior. Site observation checklists and cameras were used for assessing the conditions of the school facilities and obtaining visual documentation of the school’s physical environment.
    </p>
    <p style="text-indent: 2em;">Moreover, the researchers utilized a survey checklist questionnaire in order to provide a complete evaluation of the learning environment. 
    </p>
    <p style="text-indent: 2em;">Structured and unstructured interviews regarding design structure, circulation, and learning process in relation to the quality of education were also used to gather both qualitative and quantitative data from the participants. Obtaining existing records was involved in the collection and analysis of data through official requests to school administration, and reviewing available published reports to provide background information and enrich a better understanding of the school.
    </p>

    <br><br>

    <p style="text-align: center;"><strong>Methodology Chart</strong></p><br>
<div class="image-wrapper" onclick="toggleFullscreen(this)">
  <img src="methology_chart.webp" alt="Methodology Chart" />
  <div class="overlay"></div>
  <div class="overlay-text">View full screen</div>
</div>
<br>
  <p style="text-align: center;"><strong>Figure 22.</strong></p>
    <p style="text-align: center; opacity: 50%; width: 550px; margin: 0 auto">Methodological flowchart and process workflow for the school facility assessment of existing conditions</p>
`,
    }
  };

  const windowRight = document.getElementById(`${windowId}-right`);
  const bodyContainer = windowRight.querySelector('.window-body');

  if (bodyContainer) {
    bodyContainer.innerHTML = contentMap[windowId][contentKey] || '<p>No content found.</p>';
  }
}

document.querySelectorAll('.dock-icon').forEach(icon => {
    icon.addEventListener('click', () => {
      const windowId = icon.getAttribute('data-window-id');
      const selectedWindow = document.getElementById(windowId);
      const isVisible = selectedWindow.style.display === 'flex';

      const logo = document.getElementById('logo');
      const heading = document.getElementById('heading-container');
      const bodyText = document.getElementById('body-text-container');

      if (isVisible) {
        // Start fade-out of the window
        selectedWindow.classList.add('fade-out');

        // START fade-in of the main containers immediately
        [logo, heading, bodyText].forEach(el => {
          el.style.display = 'block';
          el.classList.add('fade-in');
          // Trigger reflow
          void el.offsetWidth;
          el.classList.add('show');

          // Clean up after fade
          setTimeout(() => {
            el.classList.remove('fade-in', 'show');
          }, 300);
        });

        // Remove window after fade-out completes
        setTimeout(() => {
          selectedWindow.style.display = 'none';
          selectedWindow.classList.remove('fade-out');
        }, 300); // matches CSS transition
      } else {
        // Hide all windows
        document.querySelectorAll('.window').forEach(win => {
          win.style.display = 'none';
          win.classList.remove('fade-out');
        });

        // Show the selected window
        selectedWindow.style.display = 'flex';

        // Hide the logo/heading/bodyText instantly
        [logo, heading, bodyText].forEach(el => {
          el.style.display = 'none';
        });
      }
    });
  });

    // Function to make an element draggable
    function makeDraggable(element) {
    let isDragging = false;
    let offsetX, offsetY;

    element.addEventListener('mousedown', (e) => {
      isDragging = true;
      offsetX = e.clientX - element.offsetLeft;
      offsetY = e.clientY - element.offsetTop;
      element.style.transition = 'none'; // Disable transition for smoother dragging
    });

    window.addEventListener('mousemove', (e) => {
      if (isDragging) {
        element.style.left = e.clientX - offsetX + 'px';
        element.style.top = e.clientY - offsetY + 'px';
      }
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
      element.style.transition = 'top 0.3s ease, left 0.3s ease'; // Re-enable transition after dragging
    });
  }

  // Make each window draggable
  document.querySelectorAll('.window').forEach(windowElement => {
    makeDraggable(windowElement);
  });

  function toggleFullscreen(wrapper) {
  // Create the overlay
  const overlay = document.createElement('div');
  overlay.classList.add('fullscreen-overlay');

  // Clone the image inside the wrapper
  const img = wrapper.querySelector('img').cloneNode(true);
  overlay.appendChild(img);

  // Click to close
  overlay.addEventListener('click', () => {
    overlay.classList.remove('show');
    setTimeout(() => {
      document.body.removeChild(overlay);
    }, 300); // Match transition duration
  });

  // Append to body and animate in
  document.body.appendChild(overlay);
  requestAnimationFrame(() => {
    overlay.classList.add('show');
  });
}

function animatePhotosOverlay(show) {
  const iconEl = document.getElementById("photosIcon");

  const iconRect = iconEl.getBoundingClientRect();
  const iconCenterX = iconRect.left + iconRect.width / 2;
  const iconCenterY = iconRect.top + iconRect.height / 2;

  const screenCenterX = window.innerWidth / 2;
  const screenCenterY = window.innerHeight / 2;

  const offsetX = iconCenterX - screenCenterX;
  const offsetY = iconCenterY - screenCenterY - 100;

  if (show) {
    // Store values for closing later
    iconEl.dataset.offsetX = offsetX;
    iconEl.dataset.offsetY = offsetY;

    gsap.set(photosOverlay, {
      display: 'flex',
      opacity: 0,
      scaleX: 0.1,
      scaleY: 0.8,
      xPercent: -50,
      yPercent: -50,
      x: offsetX,
      y: offsetY - 100,
      transformOrigin: 'center center'
    });

    gsap.to(photosOverlay, {
      duration: 0.25,
      x: 0,
      y: -50,
      scaleX: 1,
      scaleY: 1,
      opacity: 1,
      pointerEvents: 'auto',
      ease: "power2.out"
    });

  } else {
    const returnX = parseFloat(iconEl.dataset.offsetX || 0);
    const returnY = parseFloat(iconEl.dataset.offsetY || 0) - 30;

    gsap.to(photosOverlay, {
      duration: 0.2,
      scaleX: 0.02,
      scaleY: 0.15,
      x: returnX,
      y: returnY,
      opacity: 0,
      ease: "power2.in",
      pointerEvents: 'none',
      onComplete: () => {
        photosOverlay.style.display = "none";
        gsap.set(photosOverlay, { clearProps: "all" });
      }
    });
  }
}



const photosIcon = document.getElementById('photosIcon');
const dock = document.getElementById('dock');
const closeIndicator = document.getElementById('closePhotosOverlay');
const mainPhoto = document.getElementById('mainPhoto');
const mainVideo = document.getElementById('mainVideo');
const fileName = document.getElementById('fileName');
const thumbnailStrip = document.getElementById('thumbnailStrip');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

const customProgressFill = document.getElementById('customProgressFill');

// ✅ Exactly 10 media paths (images and videos)
const mediaFiles = [
  { type: 'image', src: '1 bedroom 1.avif' },
  { type: 'image', src: '1 bedroom 3.avif' },
  { type: 'image', src: '1 bedroom 2.avif' },
  { type: 'image', src: '1.avif' },
  { type: 'image', src: 'DSC_1497.avif' },
  { type: 'image', src: 'DSC_1500.avif' },
  { type: 'video', src: 'video_presentation.mp4' } // Example video file
];

let currentIndex = 0;

let animationFrameId;

function updateProgressBarSmoothly() {
  if (mainVideo && !mainVideo.paused && !mainVideo.ended) {
    const percent = (mainVideo.currentTime / mainVideo.duration) * 100;
    customProgressFill.style.width = `${percent}%`;
    animationFrameId = requestAnimationFrame(updateProgressBarSmoothly);
  }
}

mainVideo.addEventListener('play', () => {
  cancelAnimationFrame(animationFrameId); // prevent overlaps
  updateProgressBarSmoothly();
});

mainVideo.addEventListener('pause', () => {
  cancelAnimationFrame(animationFrameId);
});

mainVideo.addEventListener('ended', () => {
  cancelAnimationFrame(animationFrameId);
  customProgressFill.style.width = `100%`; // ensure full fill on end
});


function updateViewer(index) {
  currentIndex = index;
  const media = mediaFiles[index];
  fileName.textContent = media.src.split('/').pop().replace(/\.[^/.]+$/, '');


  const customProgressBar = document.getElementById('customProgressBar');
  const customProgressFill = document.getElementById('customProgressFill');

  // Show or hide media elements
  if (media.type === 'image') {
    mainPhoto.src = media.src;
    mainPhoto.style.display = 'block';
    mainVideo.style.display = 'none';

    // Hide video controls
    customProgressBar.style.display = 'none';
    pauseBtn.style.display = 'none';
    muteBtn.style.display = 'none';

    // Stop and reset the video
    mainVideo.pause();
    mainVideo.currentTime = 0;

  } else if (media.type === 'video') {
  mainVideo.src = media.src;
  mainVideo.load();
  mainVideo.loop = true;
  mainVideo.play();

  mainPhoto.style.display = 'none';
  mainVideo.style.display = 'block';

  customProgressBar.style.display = 'block';
  pauseBtn.style.display = 'block';
  muteBtn.style.display = 'block';

  // Reset progress bar
  customProgressFill.style.width = '0%';

  // Reset controls
  pauseIcon.style.display = 'block';
  playIcon.style.display = 'none';
  speakerOffIcon.style.display = 'block';
  speakerOnIcon.style.display = 'none';
}


  // Update thumbnail highlight
  Array.from(thumbnailStrip.children).forEach((thumb, i) => {
    thumb.classList.toggle('active', i === index);
  });

  // Scroll active thumbnail to center
  const activeThumb = thumbnailStrip.children[index];
  if (activeThumb) {
    const stripRect = thumbnailStrip.getBoundingClientRect();
    const thumbRect = activeThumb.getBoundingClientRect();
    const offset = thumbRect.left - stripRect.left - (stripRect.width / 2) + (thumbRect.width / 2);
    thumbnailStrip.scrollBy({ left: offset, behavior: 'smooth' });
  }
}

const customProgressBar = document.getElementById("customProgressBar");
document.addEventListener("DOMContentLoaded", () => {
  const pauseBtn = document.getElementById("pauseBtn");
  const muteBtn = document.getElementById("muteBtn");

  // Attach event listeners here if not already
});


function buildThumbnails() {
  thumbnailStrip.innerHTML = '';

  mediaFiles.forEach((media, index) => {
    if (media.type === 'image') {
      const thumb = document.createElement('img');
      thumb.src = media.src;
      thumb.alt = `Thumbnail ${index + 1}`;
      if (index === 0) thumb.classList.add('active');
      thumb.addEventListener('click', () => updateViewer(index));
      thumbnailStrip.appendChild(thumb);
    } else if (media.type === 'video') {
      // Create a canvas to capture the first frame
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const video = document.createElement('video');
      video.src = media.src;
      video.muted = true;
      video.crossOrigin = 'anonymous'; // Helpful if videos are hosted externally

      // Wait until the video has loaded enough to get a frame
      video.addEventListener('loadeddata', () => {
        // Ensure the video has loaded
        video.currentTime = 0; // Start at the first frame
      });

      // Once the video has loaded and is ready to display the frame
      video.addEventListener('seeked', () => {
        // Draw the first frame to the canvas
        canvas.width = 60;  // Set the desired size for the thumbnail
        canvas.height = 60;
        ctx.drawImage(video, 0, 0, 60, 60);  // Capture the first frame from the video
        const dataURL = canvas.toDataURL();  // Convert the canvas to a data URL

        const thumb = document.createElement('img');
        thumb.src = dataURL;  // Set the data URL as the thumbnail image source
        thumb.alt = `Video Thumbnail ${index + 1}`;
        if (index === 0) thumb.classList.add('active');
        thumb.addEventListener('click', () => updateViewer(index));
        thumbnailStrip.appendChild(thumb);
      });

      // Start loading the video to trigger 'seeked'
      video.load();
    }
  });
}

mainVideo.addEventListener('timeupdate', () => {
  const progress = (mainVideo.currentTime / mainVideo.duration) * 100;
  document.getElementById('customProgressFill').style.width = `${progress}%`;
});


// Seek to a specific time in the video using the custom progress bar
customProgressBar.addEventListener('click', (e) => {
  const rect = customProgressBar.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const width = rect.width;
  const percent = clickX / width;
  const seekTime = percent * mainVideo.duration;
  mainVideo.currentTime = seekTime;
});


// Open photos overlay
function openPhotosOverlay() {
  const overlay = document.getElementById("photosOverlay");

  // Reset to current media
  updateViewer(currentIndex);

  // Reflect correct icon states based on whether the current media is video
  const media = mediaFiles[currentIndex];
  if (media.type === 'video') {
    if (mainVideo.paused) {
      pauseIcon.style.display = 'none';
      playIcon.style.display = 'block';
    } else {
      pauseIcon.style.display = 'block';
      playIcon.style.display = 'none';
    }

    // Always reset mute to off (muted)
    mainVideo.muted = true;
    speakerOffIcon.style.display = 'block';
    speakerOnIcon.style.display = 'none';
  }

  overlay.classList.add("show");
  overlay.classList.remove("hide");
}


// Close photos overlay
function closePhotosOverlay() {
  photosOverlay.classList.remove('show');
  photosOverlay.classList.add('hide');
  dock.classList.remove('push-down');

  // Pause the video if it's playing
  mainVideo.pause();

  // Optionally reset icons
  pauseIcon.style.display = "block";
  playIcon.style.display = "none";
}


// Event listeners for opening and closing overlay
photosIcon.addEventListener('click', openPhotosOverlay);
closeIndicator.addEventListener('click', closePhotosOverlay);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closePhotosOverlay();
  }
});

// Navigation buttons
nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % mediaFiles.length;
  updateViewer(currentIndex);
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + mediaFiles.length) % mediaFiles.length;
  updateViewer(currentIndex);
});

// Initialize thumbnails
buildThumbnails();
updateViewer(0);

// Elements
const pauseIcon = document.getElementById('pauseIcon');
const playIcon = document.getElementById('playIcon');
const speakerOffIcon = document.getElementById('speakerOffIcon');
const speakerOnIcon = document.getElementById('speakerOnIcon');

// Initial setup
mainVideo.muted = true;       // start muted
mainVideo.play();             // auto-play (you can remove if browser doesn't allow)
pauseIcon.style.display = 'block';
playIcon.style.display = 'none';
speakerOffIcon.style.display = 'block';
speakerOnIcon.style.display = 'none';

document.addEventListener("DOMContentLoaded", function () {
  const pauseBtn = document.getElementById("pauseBtn");
  const muteBtn = document.getElementById("muteBtn");
// Play/Pause Toggle
pauseBtn.addEventListener('click', () => {
  if (mainVideo.paused) {
    mainVideo.play();
    pauseIcon.style.display = 'block';
    playIcon.style.display = 'none';
  } else {
    mainVideo.pause();
    pauseIcon.style.display = 'none';
    playIcon.style.display = 'block';
  }
});
});

// Mute/Unmute Toggle
muteBtn.addEventListener('click', () => {
  mainVideo.muted = !mainVideo.muted;
  if (mainVideo.muted) {
    speakerOffIcon.style.display = 'block';
    speakerOnIcon.style.display = 'none';
  } else {
    speakerOffIcon.style.display = 'none';
    speakerOnIcon.style.display = 'block';
  }
});

function toggleFullscreen(element) {
  if (!document.fullscreenElement) {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const mediaViewer = document.querySelector(".media-viewer");

  mediaViewer.addEventListener("dblclick", () => {
    toggleFullscreen(mediaViewer);
  });
});


document.addEventListener('keydown', (e) => {
  // Left arrow key (39) for Previous
  if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    if (e.key === 'ArrowLeft') {
      // Navigate to previous media
      currentIndex = (currentIndex - 1 + mediaFiles.length) % mediaFiles.length;
    } else if (e.key === 'ArrowRight') {
      // Navigate to next media
      currentIndex = (currentIndex + 1) % mediaFiles.length;
    }
    updateViewer(currentIndex);
  }

  // Escape key to close overlay
  if (e.key === 'Escape') {
    closePhotosOverlay();
  }
});

window.addEventListener("DOMContentLoaded", () => {
  // Make all .window elements draggable
  document.querySelectorAll(".window").forEach(win => {
    Draggable.create(win, {
      type: "x,y",
      bounds: "body",
      edgeResistance: 0.85,
      inertia: true
    });
  });

  // Make the photosOverlay draggable too
  Draggable.create("#photosOverlay", {
    type: "x,y",
    bounds: "body",
    edgeResistance: 0.85,
    inertia: true
  });
});

function updateDateTime() {
  const now = new Date();

  const weekday = now.toLocaleDateString(undefined, { weekday: 'short' });
  const month = now.toLocaleDateString(undefined, { month: 'short' });
  const day = now.getDate(); // just the number
  const time = now.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });

  document.getElementById('dateTimeDisplay').textContent = `${weekday} ${month} ${day} ${time}`;
}


setInterval(updateDateTime, 1000);
updateDateTime();

// Toggle dropdown visibility
const userDropdown = document.getElementById('userDropdown');
const dropdownContent = document.getElementById('dropdownContent');

userDropdown.addEventListener('click', () => {
  dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
});


// Hide dropdown on click outside
window.addEventListener('click', function(e) {
  if (!e.target.closest('.dropdown')) {
    dropdownContent.style.display = 'none';
  }
});

function showMainUI() {
  document.getElementById("heading-container").style.display = "block";
  document.getElementById("body-text-container").style.display = "block";
  document.getElementById("logo").style.display = "block";
  document.getElementById("dock").style.display = "flex";
  document.getElementById("topHeader").style.display = "flex";
}


// Handle sign out
document.getElementById('signOutBtn').addEventListener('click', () => {
  const fadeTl = gsap.timeline();

  // Remove active class from all dock icons
  document.querySelectorAll('.dock-icon').forEach(icon => {
    icon.classList.remove('active');
  });

  // Animate and hide any open window
  document.querySelectorAll('.window').forEach(windowEl => {
    if (windowEl.classList.contains('active')) {
      const windowId = windowEl.id;
      const associatedDockIcon = document.querySelector(`.dock-icon[data-window-id="${windowId}"]`);

      if (associatedDockIcon) {
        // Animate closing back to dock icon
        animateWindowToIcon(windowEl, associatedDockIcon, "out", () => {
          windowEl.style.visibility = 'hidden';
          windowEl.style.display = 'none';
          windowEl.classList.remove('active');
          gsap.set(windowEl, { clearProps: 'all' });
        });
      } else {
        // Fallback: immediately hide if no associated icon found
        windowEl.style.visibility = 'hidden';
        windowEl.style.display = 'none';
        windowEl.classList.remove('active');
        gsap.set(windowEl, { clearProps: 'all' });
      }
    }
  });

  // Hide PhotosOverlay if it was open
  if (photosOverlay.style.display === "flex") {
    animatePhotosOverlay(false);
  }

  // Disable pointer events during transition
  fadeTl.set(["#heading-container", "#body-text-container", "#logo", "#topHeader"], {
    pointerEvents: "none",
    userSelect: "none"
  });


  fadeTl.set(["#heading-container", "#body-text-container", "#logo", "#topHeader"], {
  pointerEvents: "none",
  userSelect: "none"
});

  // Animate windows, topHeader, heading-container, body-text-container fading out
  fadeTl.to([
  ".window",
  "#heading-container",
  "#body-text-container",
  "#photosOverlay"
], {
  opacity: 0,
  duration: 0.4,
  ease: "power2.inOut"
});


  // Animate dock separately: slide down + fade out
  fadeTl.to("#dock", {
    pointerEvents: "none",
    y: 300,          // 👈 move it downward
    opacity: 0,     // 👈 fade out
    duration: 0.4,
    ease: "power2.inOut"
  }, "-=0.3"); // slightly overlap with the previous fade

  fadeTl.to("#topHeader", {
  y: -50, // ✅ slides upward off viewport
  opacity: 0,
  duration: 0.4,
  ease: "power2.inOut"
}, "-=0.4"); // overlap with other elements fading

fadeTl.to("#logo", {
  bottom: "80%",
  scale: 0.6,
  opacity: 1,  // Make sure logo stays visible
  duration: 0.4,
  ease: "power2.out"
});


// After all fades
fadeTl.add(() => {
  // Hide all the elements
  document.querySelectorAll(".window").forEach(el => el.style.display = "none");
  document.getElementById("dock").style.display = "none";
  document.getElementById("topHeader").style.display = "none";
  document.getElementById("heading-container").style.display = "none";
  document.getElementById("body-text-container").style.display = "none";
  document.getElementById("photosOverlay").style.display = "none";

  // Force logo to be visible before animating
  const logo = document.getElementById("logo");
  logo.style.display = "block";
  logo.style.opacity = "1"; // ✅ make sure it's visible before moving

  // Show the sign-in card
  const card = document.getElementById("card");
  card.style.display = "flex";

  // Animate logo upwards and scale
  const resetTl = gsap.timeline();

  resetTl.to(logo, {
    bottom: "80%",   // move logo upward higher
    scale: 0.6,      // shrink logo
    opacity: 1,      // ensure still visible
    duration: 0.8,   // ⬅️ slower for smoother upward motion
    ease: "power2.out"
  });

  // Animate card sliding upward
  resetTl.fromTo(card,
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
    "-=0.5" // overlap nicely while logo is moving up
  );
});

}); 


document.getElementById("themeToggle").addEventListener("change", (e) => {
  const isDark = e.target.checked;
  if (isDark) {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }
});


document.addEventListener('contextmenu', function (e) {
  if (e.target.tagName === 'IMG') {
    e.preventDefault(); // 👈 stops right-click on images
  }
});