/**
 * AI Metabolic & Fitness Assistant Chatbot
 * Provides instant evidence-based answers for TDEE, BMR, macros, fat loss, and muscle gain.
 */

document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  // DOM Elements
  var chatTrigger = document.getElementById('chat-trigger');
  var chatWindow = document.getElementById('chat-window');
  var chatCloseBtn = document.getElementById('chat-close-btn');
  var chatMessages = document.getElementById('chat-messages');
  var chatInput = document.getElementById('chat-input');
  var chatSendBtn = document.getElementById('chat-send-btn');
  var chipButtons = document.querySelectorAll('.chat-chip');

  if (!chatTrigger || !chatWindow) return;

  // Toggle Chatbot Window
  function toggleChat(open) {
    if (open === undefined) {
      chatWindow.classList.toggle('open');
    } else if (open) {
      chatWindow.classList.add('open');
    } else {
      chatWindow.classList.remove('open');
    }

    if (chatWindow.classList.contains('open')) {
      chatInput.focus();
    }
  }

  chatTrigger.addEventListener('click', function() { toggleChat(); });
  if (chatCloseBtn) chatCloseBtn.addEventListener('click', function() { toggleChat(false); });

  // Quick Prompt Chips
  chipButtons.forEach(function(chip) {
    chip.addEventListener('click', function() {
      var text = chip.getAttribute('data-prompt') || chip.textContent.trim();
      handleUserMessage(text);
    });
  });

  // Handle Input Submission
  function submitInput() {
    var text = chatInput.value.trim();
    if (text.length === 0) return;
    chatInput.value = '';
    handleUserMessage(text);
  }

  chatSendBtn.addEventListener('click', submitInput);
  chatInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      submitInput();
    }
  });

  function appendMessage(sender, htmlContent) {
    var msgDiv = document.createElement('div');
    msgDiv.className = 'chat-msg ' + (sender === 'user' ? 'user-msg' : 'bot-msg');
    msgDiv.innerHTML =
      '<div class="msg-avatar">' + (sender === 'user' ? '👤' : '🤖') + '</div>' +
      '<div class="msg-bubble">' + htmlContent + '</div>';
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function showTypingIndicator() {
    var typingDiv = document.createElement('div');
    typingDiv.id = 'chat-typing';
    typingDiv.className = 'chat-msg bot-msg';
    typingDiv.innerHTML =
      '<div class="msg-avatar">🤖</div>' +
      '<div class="msg-bubble typing-dots"><span></span><span></span><span></span></div>';
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function removeTypingIndicator() {
    var typingDiv = document.getElementById('chat-typing');
    if (typingDiv) typingDiv.remove();
  }

  function handleUserMessage(userText) {
    appendMessage('user', escapeHtml(userText));
    showTypingIndicator();

    setTimeout(function() {
      removeTypingIndicator();
      var botResponse = generateBotResponse(userText);
      appendMessage('bot', botResponse);
    }, 600);
  }

  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, function(c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ==========================================================================
     INTELLIGENT RESPONSE ENGINE
     ========================================================================== */
  function generateBotResponse(input) {
    var lower = input.toLowerCase();

    // Check for inline numbers: age, weight, height (e.g., "25 male 80kg 180cm")
    var ageMatch = lower.match(/(\d{2})\s*(yrs|years|yr|old)?/);
    var weightMatch = lower.match(/(\d{2,3})\s*(kg|lbs|pounds|lb)/);
    var heightMatch = lower.match(/(\d{2,3})\s*(cm|in|inches)/);

    if (weightMatch && heightMatch) {
      var w = parseFloat(weightMatch[1]);
      var h = parseFloat(heightMatch[1]);
      if (weightMatch[2] === 'lbs' || weightMatch[2] === 'pounds' || weightMatch[2] === 'lb') w = w * 0.453592;
      if (heightMatch[2] === 'in' || heightMatch[2] === 'inches') h = h * 2.54;

      var age = ageMatch ? parseInt(ageMatch[1]) : 28;
      var isFemale = lower.includes('female') || lower.includes('woman') || lower.includes('girl');
      var gender = isFemale ? 'female' : 'male';

      var bmr = isFemale
        ? (10 * w) + (6.25 * h) - (5 * age) - 161
        : (10 * w) + (6.25 * h) - (5 * age) + 5;
      bmr = Math.round(bmr);
      var tdee = Math.round(bmr * 1.55); // Moderately active baseline

      return '🧮 <strong>Quick Calculation Result:</strong><br>' +
        '• <strong>Estimated BMR:</strong> ' + bmr.toLocaleString() + ' kcal/day<br>' +
        '• <strong>Estimated TDEE (Moderate):</strong> ' + tdee.toLocaleString() + ' kcal/day<br>' +
        '• <strong>Optimal Deficit (-22%):</strong> ' + Math.round(tdee * 0.78).toLocaleString() + ' kcal/day<br>' +
        '<small style="color:var(--text-muted);">Calculated via Mifflin-St Jeor equation. Use the main calculator above for custom activity multipliers!</small>';
    }

    if (lower.includes('what is tdee') || lower.includes('meaning of tdee') || lower.includes('define tdee')) {
      return '⚡ <strong>TDEE</strong> stands for <em>Total Daily Energy Expenditure</em>. It is the total number of calories your body burns in 24 hours.<br><br>' +
        'It consists of 4 components:<br>' +
        '1. <strong>BMR (60-70%):</strong> Baseline organ function at rest.<br>' +
        '2. <strong>NEAT (15%):</strong> Daily steps & non-exercise movement.<br>' +
        '3. <strong>EEE (10-15%):</strong> Exercise workouts.<br>' +
        '4. <strong>TEF (10%):</strong> Digestion cost of food.<br>' +
        '<a href="/blog/what-is-tdee/" class="chat-link">Read full guide →</a>';
    }

    if (lower.includes('difference') || lower.includes('bmr vs tdee') || lower.includes('tdee vs bmr') || lower.includes('versus')) {
      return '⚖️ <strong>BMR vs TDEE Key Difference:</strong><br>' +
        '• <strong>BMR:</strong> Calories burned staying alive at complete 24h rest (no movement).<br>' +
        '• <strong>TDEE:</strong> BMR <em>plus</em> all walking, working, exercising, and food digestion.<br><br>' +
        '⚠️ <em>Never eat below your BMR!</em> Base fat loss deficits on your TDEE.<br>' +
        '<a href="/blog/tdee-vs-bmr/" class="chat-link">Compare BMR vs TDEE →</a>';
    }

    if (lower.includes('lose weight') || lower.includes('fat loss') || lower.includes('deficit') || lower.includes('cut')) {
      return '📉 <strong>TDEE Fat Loss Strategy:</strong><br>' +
        'To lose body fat sustainably:<br>' +
        '• <strong>Mild Deficit (-15%):</strong> Preserves max muscle (~0.25 kg/wk).<br>' +
        '• <strong>Optimal Deficit (-22%):</strong> Recommended sweet spot (~0.5 kg/wk).<br>' +
        '• <strong>Aggressive Deficit (-30%):</strong> Fast loss (~0.8 kg/wk).<br><br>' +
        '<a href="/calorie-deficit-calculator/" class="chat-link">Open Deficit Calculator →</a>';
    }

    if (lower.includes('muscle') || lower.includes('bulk') || lower.includes('gain') || lower.includes('surplus')) {
      return '📈 <strong>Muscle Hypertrophy & Surplus:</strong><br>' +
        'Building muscle requires a calorie surplus above your TDEE:<br>' +
        '• <strong>Lean Surplus (+10% TDEE):</strong> Gain ~0.2 kg/wk minimizing fat.<br>' +
        '• <strong>Moderate Surplus (+15% TDEE):</strong> Consistent strength & size.<br>' +
        '<a href="/calorie-surplus-calculator/" class="chat-link">Open Surplus Calculator →</a>';
    }

    if (lower.includes('protein') || lower.includes('macro') || lower.includes('carbs') || lower.includes('fat')) {
      return '🥩 <strong>Recommended Macronutrient Allocations:</strong><br>' +
        '• <strong>Protein:</strong> 1.6 – 2.2 g per kg body weight (crucial for muscle retention).<br>' +
        '• <strong>Fats:</strong> 20% – 30% of total daily calories for hormone health.<br>' +
        '• <strong>Carbohydrates:</strong> Remaining cals for high-intensity training fuel.<br>' +
        '<a href="/macro-calculator/" class="chat-link">Calculate Your Macros →</a>';
    }

    if (lower.includes('plateau') || lower.includes('stuck') || lower.includes('not losing') || lower.includes('scale')) {
      return '🩺 <strong>Weight Loss Plateau Drivers:</strong><br>' +
        '1. <strong>Untracked liquid cals & cooking oils</strong> (e.g. 120 kcal/tbsp oil).<br>' +
        '2. <strong>Eyeballing portions</strong> instead of using a digital food scale.<br>' +
        '3. <strong>Water retention & cortisol</strong> from new workout inflammation.<br><br>' +
        'Run our interactive diagnostic tool for a full assessment!';
    }

    if (lower.includes('formula') || lower.includes('mifflin') || lower.includes('katch') || lower.includes('calculate')) {
      return '🔬 <strong>Scientific BMR Formulas Used:</strong><br>' +
        '• <strong>Mifflin-St Jeor:</strong> BMR = (10×W) + (6.25×H) - (5×A) + s<br>' +
        '• <strong>Katch-McArdle:</strong> BMR = 370 + (21.6 × LBM in kg)<br><br>' +
        '<a href="/blog/how-to-calculate-tdee/" class="chat-link">See step-by-step formula math →</a>';
    }

    if (lower.includes('hi') || lower.includes('hello') || lower.includes('hey') || lower.includes('help')) {
      return '👋 Hello! I am your <strong>Metabolic AI Assistant</strong>. Ask me anything about TDEE, BMR, calorie deficits, macros, or share your weight and height for an instant estimate!';
    }

    return '💡 I can help you calculate your TDEE, set a fat-loss deficit, plan a muscle gain surplus, or structure your macros! Try asking:<br>' +
      '• <em>"What is the difference between BMR and TDEE?"</em><br>' +
      '• <em>"How much protein should I eat?"</em><br>' +
      '• <em>"I am 28 year old male 75kg 175cm"</em>';
  }
});
