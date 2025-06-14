# 🤖 AGENT OPERATING RULES & PROTOCOLS

## ⚠️ **MANDATORY COMPLIANCE RULES**

### **Rule 1: AUTONOMOUS IMPLEMENTATION WITH QUALITY GATES**
- **PROCEED** with full systems if prototypes meet quality thresholds
- **AUTO-PROCEED** to next tasks if current task completes successfully
- **VALIDATE** all deliverables before proceeding but don't wait for approval
- **BUILD** prototypes first, then continue to production if quality is acceptable

### **Rule 2: REPORT-AND-CONTINUE PROTOCOL**
- **DOCUMENT** progress using reporting template in `AGENT_COORDINATION.md`
- **CREATE** deliverables and validate quality before proceeding
- **FLAG** any issues or questions but continue with next task
- **ESCALATE** only for critical errors, missing dependencies, or quality failures

### **Rule 3: AUTONOMOUS COORDINATION**
- **CHECK** `AGENT_COORDINATION.md` for current task assignment
- **UPDATE** status when starting/completing work and auto-proceed
- **DELIVER** all specified deliverables with quality validation
- **BYPASS** approval gates if quality thresholds are met

### **Rule 4: AUTONOMOUS COMMUNICATION STANDARDS**
- **USE** the structured report template for documentation
- **INCLUDE** working demos/prototypes with every report
- **FLAG** specific blocking issues only, not general questions
- **PROVIDE** concrete timelines and technical details, then proceed

---

## 📋 **CONTENT STRATEGY AGENT - CURRENT ASSIGNMENT**

### **🎯 ACTIVE TASK: Playwright Video Pipeline Prototype**

**Your Mission:**
Create a working prototype that captures MP4 videos of demo interactions using Playwright with `--video` flag.

**Specific Requirements:**
1. **Extend existing test** - Use our current `test-demo-modals.js` as base
2. **Capture story mode interaction** - Record a user going through filesystem story demo
3. **Generate clean MP4** - 720p minimum, good quality for tutorials
4. **Headless operation** - Must work without human intervention
5. **File output** - Save to `demos/` directory with clear naming

**Deliverables You Must Create:**
- [ ] Working Playwright test file: `tests/video-capture.spec.js`
- [ ] Sample MP4 output: `demos/filesystem-story-demo.mp4`
- [ ] Technical documentation: `docs/video-pipeline.md`
- [ ] Integration plan for existing test suite

**Success Criteria:**
- MP4 shows complete story mode interaction (user question → AI response → "Try This" → results)
- Video quality is suitable for tutorial use
- Process runs automatically without manual intervention
- No breaking changes to existing functionality

**Autonomous Execution Guidelines:**
- ✅ Build working prototypes AND proceed to full implementation if successful
- ✅ Test thoroughly and self-validate quality before proceeding
- ✅ Create sample outputs and auto-proceed if they meet thresholds
- ✅ Write completion reports for documentation
- ✅ AUTO-PROCEED to next tasks if current task succeeds

---

## 📝 **REQUIRED REPORTING TEMPLATE**

When you complete the prototype, you MUST use this exact format:

```markdown
# 🎬 TASK 1 REPORT: Playwright Video Pipeline

## **STATUS:** [COMPLETE/BLOCKED/NEEDS_CLARIFICATION]

## **DELIVERABLES COMPLETED:**
- [ ] `tests/video-capture.spec.js` - Working test file
- [ ] `demos/filesystem-story-demo.mp4` - Sample output video
- [ ] `docs/video-pipeline.md` - Technical documentation
- [ ] Integration plan documented

## **PROTOTYPE DEMONSTRATION:**
**Video file location:** `demos/filesystem-story-demo.mp4`
**Video duration:** [X seconds]
**File size:** [X MB]
**Resolution:** [XxY pixels]
**Quality assessment:** [Your evaluation]

## **TECHNICAL IMPLEMENTATION:**
**Approach used:** [Describe your technical approach]
**Dependencies added:** [List any new packages]
**Playwright configuration:** [Show relevant config]
**Command to run:** [Exact command user runs to generate video]

## **INTEGRATION WITH EXISTING TESTS:**
**Current test compatibility:** [How it works with existing tests]
**Breaking changes:** [None expected, or list any]
**Performance impact:** [Video generation time]

## **CHALLENGES & SOLUTIONS:**
**Issues encountered:** [Technical problems you solved]
**Workarounds needed:** [Any compromises made]
**Browser compatibility:** [Tested browsers]

## **NEXT PHASE RECOMMENDATIONS:**
**TTS integration approach:** [Your recommended approach]
**Timeline estimate:** [Hours/days for full implementation]
**Risk assessment:** [Potential issues to watch for]

## **EXCEPTIONS/ESCALATIONS (ONLY IF NEEDED):**
1. [Critical error that prevents completion]
2. [Missing dependency that cannot be resolved]
3. [Quality failure below minimum thresholds]

## **AUTONOMOUS PROGRESSION:**
- ✅ Video quality meets thresholds (720p+, <50MB, good sync): AUTO-PROCEED
- ✅ All deliverables created and tested: AUTO-PROCEED to next task
- ⚠️ Any quality issues or errors: ESCALATE with specific details

**Agent:** Content Strategy Agent
**Date:** [Today's date]
**Time spent:** [Hours]
**Next Action:** [AUTO-PROCEED to Task 2 | ESCALATE: specific issue]
```

---

## 🚨 **ENFORCEMENT PROTOCOLS**

### **If Agent Violates Rules:**

**Violation: Working on unauthorized tasks**
- **Response:** Stop immediately, return to assigned task
- **Action:** Report current progress, ask for new assignment

**Violation: Proceeding despite quality failures**
- **Response:** Fix quality issues before proceeding
- **Action:** Re-validate deliverables and ensure thresholds are met

**Violation: Incomplete reporting**
- **Response:** Redo report with all required sections
- **Action:** Cannot proceed until proper report submitted

**Violation: No deliverables provided**
- **Response:** Work is not considered complete
- **Action:** Create working prototypes before reporting

### **Compliance Verification:**

Before submitting any report, agent must verify:
- ✅ All deliverables created and tested
- ✅ Report follows exact template format
- ✅ Specific questions asked for clarification
- ✅ No unauthorized work performed
- ✅ Approval explicitly requested

---

## 🎯 **SUCCESS METRICS FOR AGENTS**

### **Quality Metrics:**
- **Deliverable completeness:** 100% of specified items created
- **Technical accuracy:** Working prototypes, no broken code
- **Communication clarity:** Specific questions, clear documentation
- **User satisfaction:** Meets user expectations on first review

### **Process Metrics:**
- **Rule compliance:** No violations of operating procedures
- **Timeline accuracy:** Realistic estimates, delivered on time
- **Coordination effectiveness:** Proper use of approval gates
- **Iteration efficiency:** Quick response to user feedback

---

## 📞 **AGENT CHECK-IN PROTOCOL**

### **Before Starting Work:**
1. Read current task assignment in `AGENT_COORDINATION.md`
2. Confirm understanding of deliverables
3. Acknowledge receipt of assignment
4. Estimate timeline for prototype completion

### **During Work:**
1. Focus only on assigned task
2. Create working prototypes
3. Document technical decisions
4. Test thoroughly before reporting

### **After Completion:**
1. Verify all deliverables are working and meet quality thresholds
2. Create completion report using template
3. Auto-proceed to next task if quality validates
4. Only escalate if critical errors or quality failures occur

### **If Blocked:**
1. Document specific blocker
2. Provide attempted solutions
3. Ask specific questions for unblocking
4. Do not work on other tasks while blocked

---

## 🔒 **FINAL AUTHORITY**

- **User has final approval** on all agent work
- **No agent can override** user decisions
- **All work stops** if user says stop
- **All agents must coordinate** through this system

**These rules are mandatory and non-negotiable. Compliance is required for continued participation in the project.**

---

**Last Updated:** Today  
**Enforcement Level:** Mandatory  
**Next Review:** After first agent report submission