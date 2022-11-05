growthQs = [
  "What has been the work highlight/lowlight from the past week?",
  "Who’s someone in the company that you’d like to learn more from?",
  "What projects would you like to work on or be more involved in?",
  "What professional goals would you like to accomplish in the next 6 to 12 months, and what makes you say that?",
  "What’s something you’re itching to try that you haven’t had the time or resources to do?",
  "Is your job what you expected when you accepted it? If not, where has it differed?",
  "What other roles at [your company] do you find interesting? What skills do those roles require that you would like to work on?",
  "What else can I be doing to help progress your career?",
  "What are your work and non-work highlights of the past month?",
  "What’s one thing you’d like to do more of, outside of work this coming month?"
];

communicationsQs = [
  "What’s one thing we can do to improve the performance of the team?",
  "Are you happy with our level of communication? How would you change it?",
  "What’s top of mind right now that we haven’t talked about yet?",
  "If you were managing the team, what would you do differently?",
  "Who is doing a great job on the team? What have they done?",
  "Am I acting like the best manager you could wish for? What could I be doing better?",
  "When’s the best time to give feedback on your work?",
  "Where has our communication faltered? Can you give me an example?",
  "Is there anything that would be productive for me to re-explain to our team?",
  "Am I providing enough clarity on our direction?",
  "Where would you like me involved more in your day to day? Where would you like me involved less?",
  "What needs to change around our team meetings?",
  "What do you like about our one-on-one meetings? What can be improved?",
  "Are there any roles on the team that you feel unclear on?",
  "What are your top priorities this week?",
  "What’s a problem we have on our team that I might not know about?",
  "What can I hold you accountable for next time we talk?",
  "How could we improve cross-functional collaboration at [your company]?"
];

motivationQs = [
  "If you were the CEO, what’s the first thing you’d change?",
  "What’s one thing we could change about work for you that would improve your personal life?",
  "What’s something you’re proud of that happened this week? This month?",
  "What are you passionate about, personally or professionally?",
  "Who on our team deserves a shoutout for their work and why?",
  "What do you wish I did less of? More of?",
  "What’s something past managers have done that’s inspired and motivated you?",
  "What’s something past managers have done that’s really frustrated you?",
  "What does an ideal, productive workday look like to you? Walk me through it.",
  "What makes you excited and motivated to work on a project?",
  "Are you happy in your role? What could make it better for you?",
  "On a scale of 1-10, how happy are you at work?",
  "What’s your least favorite part of your day-to-day at work?",
  "What’s one thing you would recommend to improve our workplace culture?",
  "Do you find your physical work environment productive? Is there anything preventing you from being productive?",
  "Are you proud of the work you do here?",
  "How do you feel about the balance between your individual work vs. managing?",
  "How do you feel your work/life balance is? What would you want to change, if anything?",
  "Are there any goals we have on a company, team or individual level that you feel are entirely unattainable? If so, why?",
  "What’s the best thing about working here?",
  "How are you feeling about your goals?",
  "Which one best describes you during the past month? 😀 🙂 😐 🤔 😒 😳 😰 😤"
];

challengeQs = [
  "What’s one thing I can do right now to make work better for you?",
  "Where do you need help?",
  "Do you have any questions about what other team members are working on?",
  "What do you need? What could make your day-to-day easier?",
  "If you were a hiring manager for our team, what role would be your next hire?",
  "What’s something you’d like to share but is a little stressful to bring up in person?",
  "What’s your outlook on next week?",
  "Do you have any questions that, if answered, would help you in your day-to-day?",
  "What are you least clear about, in terms of our company-wide strategy and goals?",
  "Do I have anything outstanding for you that I haven’t done yet?",
  "What, if anything, is stressing you out?",
  "What, if anything, feels harder than it should be in your day to day work?"
];

feedbackQs = [
  "What do you like about my management style? What do you dislike?",
  "On a scale of 1-10, how has my level of support/presence been over the past month?",
  "Where do you need support right now?",
  "Where do you think I should be focusing more of my attention?",
  "What is one thing I could experiment with doing differently this month? ",
  "Am I giving you enough feedback on your work?",
  "What is everyone around me neglecting to share with me?",
  "If I could improve one skill between this meeting and the next, which would you choose?",
  "What’s everyone around me NOT telling me?",
  "What “soft skills” do you think I excel at most? What can I work on?"
];

const questions = [growthQs, communicationsQs, motivationQs, challengeQs, feedbackQs];

function buildQarray(build = 31) {
  var mod = questions.length - 1;
  var pickedQs = [];

  while (mod >= 0) {
    if (build - (2**mod) >= 0) {

      build -= (2**mod);

      pickedQs.push.apply(pickedQs, questions[mod]);
    }
    mod -= 1;
  }

  if (pickedQs.length == 0) {
    questions.forEach((item, i) => {
      pickedQs.push.apply(pickedQs, item);
    })
  }

  return pickedQs;
}

function pickQ() {
  tab = 0;
  if ($('#feedbackQs').prop("checked")) {tab += 16;}
  if ($('#challengeQs').prop("checked")) {tab += 8;}
  if ($('#motivationQs').prop("checked")) {tab += 4;}
  if ($('#communicationQs').prop("checked")) {tab += 2;}
  if ($('#growthQs').prop("checked")) {tab += 1;}

  var allQuestions = buildQarray(tab);

  var myQuestion = allQuestions[Math.floor(Math.random()*allQuestions.length)];

  $('#question').html(myQuestion);
  $('#howToUse').remove();
  $('#generateSettings').remove();
}

$( function() {

})
